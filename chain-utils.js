const crypto = require("crypto");

function hash(str) {
	return str != null
		? crypto
				.createHash("sha256")
				.update(str.toString())
				.digest("hex")
		: "";
}

// console.log(hash("test"));

module.exports = hash;
