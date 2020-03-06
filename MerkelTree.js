const crypto = require("crypto");
const util = require("util");

class MerkelTree {
    constructor() {
        this.root = [];
    }

    createTree(data) {
        this.root.push(data);
        this.root.push(
            data.map(t =>
                crypto
                    .createHash("sha256")
                    .update(t.toString())
                    .digest("hex")
            )
        );
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

    add(data) {
        if (this.root.length == 0) {
            console.log("Tree is empty. Create a tree first.");
            return;
        }
        this.createTree([...this.root[0], ...data]);
    }

    verify(data) {
        let position = this.root[0].find(d => d == data);
        console.log(position);
        if (position) {
            let indexToVerify = position - 1;

            let hash = crypto
                .createHash("sha256")
                .update(data.toString())
                .digest("hex");

            let tempRoot = [...this.root];
            tempRoot[0][indexToVerify] = data;
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
                            crypto
                                .createHash("sha256")
                                .update(
                                    tempRoot.slice(-1)[0][index] +
                                        tempRoot.slice(-1)[0][index + 1]
                                )
                                .digest("hex")
                        );
                    else temp.push(tempRoot.slice(-1)[0][index]);
                }
                tempRoot.push(temp);
            }
            console.log(
                util.inspect(tempRoot, false, null, true /* enable colors */)
            );

            if (this.root.slice(-1)[0] !== tempRoot.slice(-1)[0])
                console.log("Invalid");
            else console.log("Valid");
        } else console.log("Data Not Found");
    }
}

const tree = new MerkelTree();
tree.createTree([1, 2, 3, 4, 5]);
console.log(util.inspect(tree, false, null, true /* enable colors */));

console.log(
    crypto
        .createHash("sha256")
        .update("kashish")
        .digest("hex")
);

tree.add([6, 7, 8, 9]);
console.log(util.inspect(tree, false, null, true /* enable colors */));
tree.verify(3);
