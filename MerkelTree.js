const sha256 = require("./chain-utils");
const util = require("util");

class MerkelTree {
	constructor() {
		this.root = [];
	}

	createTree(transactionList) {
		this.root.push(transactionList);
		this.root.push(transactionList.map(t => t.hash));
		// console.log(this.root.slice(-1));

		while (this.root.slice(-1)[0].length > 1) {
			let temp = [];

			for (
				let index = 0;
				index < this.root.slice(-1)[0].length;
				index += 2
			) {
				if (index < this.root.slice(-1)[0].length - 1 && index % 2 == 0)
					temp.push(
						sha256(
							this.root.slice(-1)[0][index] +
								this.root.slice(-1)[0][index + 1]
						)
					);
				else temp.push(this.root.slice(-1)[0][index]);
			}
			this.root.push(temp);
		}
	}

	add(data) {
		if (this.root.length == 0) {
			console.log("Tree is empty. Create a tree first.");
			return;
		}
		this.createTree([...this.root[0], ...data]);
	}

	verify(transaction) {
		let position = this.root[0].find(t => t.hash == transaction.hash);
		// console.log(position);
		if (position) {
			let indexToVerify = position - 1;

			let hash = sha256(transaction.toString());

			let tempRoot = [...this.root];
			tempRoot[0][indexToVerify] = transaction;
			tempRoot[1][indexToVerify] = hash;

			while (tempRoot.slice(-1)[0].length > 1) {
				let temp = [];

				for (
					let index = 0;
					index < tempRoot.slice(-1)[0].length;
					index += 2
				) {
					if (
						index < tempRoot.slice(-1)[0].length - 1 &&
						index % 2 == 0
					)
						temp.push(
							sha256(
								tempRoot.slice(-1)[0][index] +
									tempRoot.slice(-1)[0][index + 1]
							)
						);
					else temp.push(tempRoot.slice(-1)[0][index]);
				}
				tempRoot.push(temp);
			}
			// console.log(
			// 	util.inspect(tempRoot, false, null, true /* enable colors */)
			// );

			if (this.root.slice(-1)[0] !== tempRoot.slice(-1)[0])
				console.log("Invalid");
			else console.log("Valid");
		} else console.log("Data Not Found");
	}
}

module.exports = MerkelTree;
