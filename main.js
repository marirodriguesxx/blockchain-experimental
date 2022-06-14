const SHA256 = require('crypto-js/sha256');

class Block {
    // the index will tell whre the block is on the chain
    // the timestamp will tell us when the block was created
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); // the block hash
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){ //PoW
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce ++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);;
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let savjeeCoin = new Blockchain();
console.log('Mining Block 1');
savjeeCoin.addBlock(new Block(1, "10/07/2022", {amount:4}));
console.log('Mining Block 1');
savjeeCoin.addBlock(new Block(2, "16/05/2022", {amount:10}));

// console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());

// savjeeCoin.chain[1].data = { amount: 100};
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash(); //must still false

// console.log('Is blockchain valid? ' + savjeeCoin.isChainValid());

// console.log(JSON.stringify(savjeeCoin, null, 4));