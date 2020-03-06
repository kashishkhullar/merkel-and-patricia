class Transaction {
    constructor(to, from, amount) {
        this.to = to;
        this.from = from;
        this.amount = amount;
        this.hash = "Random_String";
        this.signature = "Random_String";
    }

    //TODO: Add toString function
    toString() {}
}

let trx = new Transaction(1, 2, 3);

console.log(trx);
