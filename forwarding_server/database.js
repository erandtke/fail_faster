/**
 * @file  database.ts
 * interface for getting forwarding account info.
 */
// pass through
export class InMemoryDatabase {
    constructor() {
        this.database = new Map();
    }
    get(key) {
        console.log("getting " + key + " to db");
        return this.database.get(key);
    }
    set(key, value) {
        console.log("adding " + key + " to db");
        this.database.set(key, value);
    }
}
