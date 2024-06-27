module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'sql_user',
            password: '69',
            database: 'user_database'
        }
    }
};
