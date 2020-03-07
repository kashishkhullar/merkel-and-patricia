const MerkelTree = require("./MerkelTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");
const PatriciaTrie = require("./PatriciaTrie");

const util = require("util");

let transactionList = new TransactionList();

for (let index = 0; index < 5; index++) {
	transactionList.add(new Transaction(1, 2, 3));
}

// const tree = new MerkelTree();
// tree.createTree(transactionList.list);
// console.log(util.inspect(tree, false, null, true /* enable colors */));

// // console.log(sha256("kashish"));

// let transactionList2 = new TransactionList();

// for (let index = 0; index < 5; index++) {
// 	transactionList2.add(new Transaction(1, 2, 3));
// }

// tree.add(transactionList2.list);
// console.log(util.inspect(tree, false, null, true /* enable colors */));
// tree.verify(transactionList.list[2]);

let trie = new PatriciaTrie();
trie.add(transactionList.list[0]);

transactionList.list.forEach(transaction => trie.add(transaction));
console.log(util.inspect(trie, { showHidden: false, depth: null }));
console.log(trie);
