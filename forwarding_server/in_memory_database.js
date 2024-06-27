// pass through
export class InMemoryDatabase {
    constructor() {
        this.database = new Map();
    }
    create(key, value) {
        this.database.set(key, value);
    }
    read(key) {
        console.log("getting " + key + " to db");
        return this.database.get(key);
    }
    update(key, value) {
        if (!this.database.has(key))
            throw ("No key " + key + ", bailing!");
        this.database.set(key, value);
    }
    delete(key) {
        if (!this.database.has(key))
            return;
        this.database.delete(key);
    }
}
