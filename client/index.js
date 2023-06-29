
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

//let's add realine to help user type the name
const readline = require('readline');


async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Enter your name: ', (name) => {
     // TODO: how do we prove to the server we're on the nice list? 
    // create the merkle tree for the whole nice list

    const merkleTree = new MerkleTree(niceList);

    // get the root
    const root = merkleTree.getRoot();
    const buildproof=(name)=>{
      return merkleTree.getProof(niceList.findIndex(n => n === name));
    }
    
    axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      name:name,
      proof:buildproof(name),
      root:root
    
    }).then(({ data: gift })=>{
        console.log(gift);
        console.log("=======")
        rl.close();
        main();
    });
    
  });
}
main();
