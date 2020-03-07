const util = require("util");
class PatriciaTrie {
    constructor() {
        this.root = {};
    }

    add(str) {
        let temporaryRoot = this.root;

        for (let i = 0; i < str.length; i++) {
            let character = str[i];
            if (temporaryRoot[character] == undefined) {
                temporaryRoot[character] = {};
            }
            temporaryRoot = temporaryRoot[character];
        }
        temporaryRoot["DATA"] = str;
    }
}

const trie = new PatriciaTrie();
console.log(trie);
trie.add("cat");
console.log(trie);

console.log(util.inspect(trie, { showHidden: false, depth: null }));
trie.add("car");
console.log(util.inspect(trie, { showHidden: false, depth: null }));
console.log(trie.root["c"]["a"]["t"].DATA);
