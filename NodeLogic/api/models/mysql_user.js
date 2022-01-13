const db = require('../config/db');

class MysqlUser {


    static async createUser(email, password, balance, account) {
        let sql = `INSERT into inBillo_users(
            email,
            password,
            balance,
            account
        )
        VALUES(
            '${email}',
            '${password}',
            '${balance}',
            '${account}'
        );`;

        const [newUser, _] = await db.execute(sql);

        return newUser;

    }

    static async findAll() {
        let sql = "SELECT * FROM inBillo_users;";
        let result = await db.execute(sql);
        return result;
    }

    static async login(email) {
        let sql = `SELECT * FROM inBillo_users where email = '${email}';`;

        let result = await db.execute(sql);
        return result;


    }

    static async findById(id) {
        let sql = `SELECT * FROM inBillo_users where id = ${id};`;
        let result = await db.execute(sql);
        return result;

    }
    static async findByEmail(email) {
        let sql = `SELECT * FROM inBillo_users where email = '${email}';`;
        let result = await db.execute(sql);
        return result;

    }
    static async findByAccountNumber(account) {
        let sql = `SELECT * FROM inBillo_users where account = '${account}';`;
        let result = await db.execute(sql);
        return result;

    }

}

module.exports = MysqlUser;