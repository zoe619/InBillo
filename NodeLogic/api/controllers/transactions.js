const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Transactions = require("../models/transactions");
const MysqlUser = require("../models/mysql_user");

exports.lending = async(req, res, next) => {

    try {
        // check if receivers account number exist
        const [receiver, _] = await MysqlUser.findByAccountNumber(req.body.receiver);

        if (receiver.length < 1) {
            res.status(409).json({
                "message": "Receiver does not have an account"

            })
            return;

        }
        if (req.userData.balance < req.body.amount) {
            res.status(201).json({
                "message": "Insufficient balance"

            })
            return;
        }
        if (req.userData.account == req.body.receiver) {
            res.status(201).json({
                "message": "You cannot lend to yourself"

            })
            return;
        }


        let senderBalance = req.userData.balance - req.body.amount;
        let senderId = req.userData.userId;
        let receiverId = receiver[0].id;
        let receiverBalance = receiver[0].balance + req.body.amount;


        newTxn = await Transactions.lending(req.userData.account, req.body.receiver, req.body.amount);

        res.status(200).json({
            "message": "Lending/Borrowing Transactions Created",
            "transaction": newTxn
        })

        // update receivers balance
        await Transactions.updateBalance(receiverBalance, receiverId);
        // update senders balance
        await Transactions.updateBalance(senderBalance, senderId);

    } catch (err) {
        res.status(500).json({
            "message": "error performing lending/borrowing"
        })
    }
};

// 
exports.buying = async(req, res, next) => {

    try {
        // check if sellers account number exist
        const [seller, _] = await MysqlUser.findByAccountNumber(req.body.seller);

        if (seller.length < 1) {
            res.status(409).json({
                "message": "Seller account not found"

            })
            return;

        }
        if (req.userData.balance < req.body.amount) {
            res.status(201).json({
                "message": "Insufficient balance for buyer"

            })
            return;
        }
        if (req.userData.account == req.body.buyer) {
            res.status(201).json({
                "message": "You cannot buy from yourself!!"

            })
            return;
        }


        let buyerBalance = req.userData.balance - req.body.amount;
        let buyerId = req.userData.userId;
        let sellerId = seller[0].id;
        let sellerBalance = seller[0].balance + req.body.amount;


        newTxn = await Transactions.buying(seller[0].account, req.userData.account, req.body.amount);

        res.status(200).json({
            "message": "Buying/Selling Transactions Created",
            "transaction": newTxn
        })

        // update sellers balance
        await Transactions.updateBalance(sellerBalance, sellerId);
        // update buyers balance
        await Transactions.updateBalance(buyerBalance, buyerId);

    } catch (err) {
        res.status(500).json({
            "message": "error performing buying/selling"
        })
    }
};