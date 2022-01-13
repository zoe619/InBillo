const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const MysqlUser = require("../models/mysql_user");

exports.create_account = async(req, res, next) => {

    try {

        const [user, _] = await MysqlUser.findByEmail(req.body.email);


        if (user.length < 1) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    newUser = MysqlUser.createUser(req.body.email, hash, req.body.balance, req.body.account);

                    res.status(200).json({
                        "message": "User Account Created",
                        "user": newUser
                    })
                }
            });

        } else {
            res.status(409).json({
                "message": "Email Exist"

            })
        }

    } catch (err) {
        res.status(500).json({
            "message": "error creating user"
        })
    }
};

exports.user_login = async(req, res, next) => {

    try {
        const [user, _] = await MysqlUser.findByEmail(req.body.email);
        if (user.length > 0) {

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0].id,
                            balance: user[0].balance,
                            account: user[0].account
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });

        } else {
            res.status(409).json({
                "message": "User Not Found"

            })
        }

    } catch (err) {
        res.status(500).json({
            "message": "Invalid login credentials",
            "error": err
        })
        next(err);

    }


}

exports.find_all = async(res, req, next) => {


    try {
        const [newUser, _] = await MysqlUser.findAll();

        res.status(200).json({
            "message": "All Inbillo Users",
            "user": newUser
        })

    } catch (err) {

        next(err);
        console.log(err);
    }


}