var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Knex from 'knex';
import knexDevelopmentConfig from './knexfile';
const config = knexDevelopmentConfig;
// pass through
export class KnexDatabase {
    constructor() {
        this.tableName = 'accounts';
        this.knex = Knex(config);
        function query(knex, tableName) {
            return __awaiter(this, void 0, void 0, function* () {
                const exists = yield knex.schema.hasTable(tableName);
                if (exists) {
                    yield knex.schema.createTable(tableName, (table) => {
                        table.increments('id').primary();
                        table.string('account_name'); // key
                        table.string('owner');
                        table.string('repo');
                        table.string('token');
                    });
                }
            });
        }
        query(this.knex, this.tableName);
    }
    create(key, value) {
        function query(knex, tableName) {
            return __awaiter(this, void 0, void 0, function* () {
                yield knex(tableName).insert(value);
            });
        }
        query(this.knex, this.tableName);
    }
    read(key) {
        function query(knex, tableName) {
            return __awaiter(this, void 0, void 0, function* () {
                const account = yield knex(tableName).where({ account_name: key });
                var accountInfo = {};
                accountInfo.owner = account.owner;
                accountInfo.repo = account.repo;
                accountInfo.token = account.token;
                return accountInfo;
            });
        }
        var accountInfo = {};
        return accountInfo;
    }
    update(key, value) {
        var owner = value.owner;
        var repo = value.repo;
        var token = value.token;
        function query(knex, tableName) {
            return __awaiter(this, void 0, void 0, function* () {
                let partialQuery = knex(tableName).where({ account_name: key });
                yield partialQuery.update({ key, owner, repo, token });
            });
        }
        query(this.knex, this.tableName);
    }
    delete(key) {
        function query(knex) {
            return __awaiter(this, void 0, void 0, function* () {
                let partialQuery = knex('accounts').where({ account_name: key });
                yield partialQuery.del();
            });
        }
        query(this.knex);
    }
}
