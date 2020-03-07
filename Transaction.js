const sha256 = require("./chain-utils");

class Transaction {
	constructor(to, from, amount) {
		this.to = to;
		this.from = from;
		this.amount = amount;
		this.hash = sha256(Math.random());
		this.id = Transaction.getCount();
	}

	static getCount() {
		Transaction.incrementCount();
		return Transaction.count;
	}

	static incrementCount() {
		Transaction.count++;
	}

	toString() {
		return `
        to:${this.to}
        from:${this.from}
        amount:${this.amount}
        hash:${this.hash}
        id:${this.id}`;
	}
}

Transaction.count = 0;

// for (let i = 0; i < 5; i++) {
// 	console.log(new Transaction(1, 2, 3));
// }

module.exports = Transaction;
