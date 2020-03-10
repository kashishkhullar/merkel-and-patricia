# Implementing Merkel and Patricia Tree in Node.js
Node.js implementation of Merkel tree and Patricia Tree used in Ethereum blockchain

## MerkelTree
This class has the following methods:

1. `createTree(transactionList)`

    Adds layers to the tree for the passed transaction list

2. `verify(transaction)`

    Checks if the transaction is valid or not



## PatriciaTrie
This class has the following methods:

1. `add(transaction)`

    Add transaction to the trie

2. `get(hash) `

    Get transaction from the trie for the passed trie

1. `remove(hash) `

    Remove the trnasaction with the hash if found



