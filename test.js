// TODO: Add comments

const MerkelTree = require("./MerkelTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");
const util = require("util");
const PatriciaTrie = require('./PatriciaTrie')
let transactionList = new TransactionList();

// Create tansactions with random data
for (let index = 0; index < 5; index++) {
	transactionList.add(new Transaction(Math.random(), Math.random(), Math.random()));
}

/**
 * Uncomemnt this section for testing Merkel Tree
 * Uncomment the console log with util to get detailed logs
 */
// const tree = new MerkelTree();

// tree.createTree(transactionList.list);
// // console.log(util.inspect(tree, false, null, true /* enable colors */));
// tree.verify(transactionList.list[2]);

// Lets tamper the data

// transactionList.list[2].to = "kashish";
// // console.log(util.inspect(transactionList, false, null, true /* enable colors */));
// tree.verify(transactionList.list[2]);

/**
 * Uncomemnt this section for testing Patria Trie
 * Uncomment the console log with util to get detailed logs
 */
let patriciaTrie = new PatriciaTrie();

transactionList.list.forEach(transaction => {
	patriciaTrie.add(transaction);
});

// console.log(util.inspect(patriciaTrie, false, null, true /* enable colors */));

console.log(patriciaTrie.get(transactionList.list[0].hash));
console.log(patriciaTrie.remove(transactionList.list[0].hash));
console.log(patriciaTrie.get(transactionList.list[0].hash));


console.log(patriciaTrie.get("random-string"));
console.log(patriciaTrie.remove("random-string"));


