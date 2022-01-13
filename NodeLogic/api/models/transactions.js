const db = require('../config/db');

class Transactions {


    static async lending(sender, receiver, amount) {

        let date = Date.now();
        let sql = `INSERT into inBillo_transactions(
            sender,
            receiver,
            amount,
            txn_type,
            date
        )
        VALUES(
            '${sender}',
            '${receiver}',
            '${amount}',
            'lending/borrowing',
            '${date}'
        );`;

        const [lending_tnx, _] = await db.execute(sql);

        return lending_tnx;

    }

    static async buying(seller, buyer, amount) {

        let date = Date.now();
        let sql = `INSERT into inBillo_transactions(
            sender,
            receiver,
            amount,
            txn_type,
            date
        )
        VALUES(
            '${seller}',
            '${buyer}',
            '${amount}',
            'buying/selling',
            '${date}'
        );`;

        const [lending_tnx, _] = await db.execute(sql);

        return lending_tnx;

    }



    // update users account balance
    static async updateBalance(bal, id) {
        let sql = `UPDATE inBillo_users set balance = '${bal}' where id = '${id}';`;
        let result = await db.execute(sql);
        return result;

    }


}

module.exports = Transactions;