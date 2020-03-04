const crypto = require("crypto");

class MerkelTree {
    constructor() {
        this.root = [];
    }

    createTree(data) {
        this.root = [
            data.map(t =>
                crypto
                    .createHash("sha256")
                    .update(t.toString())
                    .digest("hex")
            )
        ];
        console.log(this.root.slice(-1));

        while (this.root.slice(-1)[0].length > 1) {
            let temp = [];

            for (
                let index = 0;
                index < this.root.slice(-1)[0].length;
                index += 2
            ) {
                if (index < this.root.slice(-1)[0].length - 1 && index % 2 == 0)
                    temp.push(
                        crypto
                            .createHash("sha256")
                            .update(
                                this.root.slice(-1)[0][index] +
                                    this.root.slice(-1)[0][index + 1]
                            )
                            .digest("hex")
                    );
                else temp.push(this.root.slice(-1)[0][index]);
            }
            this.root.push(temp);
        }
    }
}

const tree = new MerkelTree();
tree.createTree([1, 2, 3, 4, 5]);
console.log(tree);

console.log(
    crypto
        .createHash("sha256")
        .update("kashish")
        .digest("hex")
);
