class PatriciaTrie {
	constructor() {
		this.root = {};
	}

	// Add transaction to the trie
	add(transaction) {
		let temporaryRoot = this.root;
		let str = transaction.hash;

		for (let i = 0; i < str.length; i++) {
			let character = str[i];
			if (temporaryRoot[character] == undefined) {
				temporaryRoot[character] = {};
			}
			temporaryRoot = temporaryRoot[character];
		}
		temporaryRoot["DATA"] = transaction;
	}

	// Get transaction from the trie for the passed trie
	get(hash) {
		let temporaryRoot = this.root;

		for (let index = 0; index < hash.length; index++) {
			if (temporaryRoot) temporaryRoot = temporaryRoot[hash[index]];
			else return null;
		}
		if (temporaryRoot["DATA"]) return temporaryRoot["DATA"];
		else return null;
	}

	// Remove the trnasaction with the hash if found
	remove(hash) {
		let temporaryRoot = this.root;

		for (let index = 0; index < hash.length; index++) {
			if (temporaryRoot) temporaryRoot = temporaryRoot[hash[index]];
			else return false;
		}
		if (temporaryRoot["DATA"]) {
			delete temporaryRoot["DATA"];
			return true;
		} else return false;
	}
}

module.exports = PatriciaTrie