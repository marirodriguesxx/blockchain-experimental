const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec; // generate a public and private key, sign and verify a signature
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('472be998dc4a8a58c1baf61903f3b57c84b6f03496682fe1775fd3374467cffe');
const myWalletAddress = myKey.getPublic('hex');


let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);


console.log('\n Startting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);
console.log('\n Balance of Xavier is', savjeeCoin.getBalanceOfAddress(myWalletAddress));


console.log('Is chain valid? ', savjeeCoin.isChainValid());

// console.log('\n Startting the miner again...');
// savjeeCoin.minePendingTransactions('xavier-address');
// console.log('\n Balance of Xavier is', savjeeCoin.getBalanceOfAddress('xavier-address'));