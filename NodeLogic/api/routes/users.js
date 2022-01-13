const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post("/create_account", UserController.create_account);

router.post("/login", UserController.user_login);

router.get("/get_all", UserController.find_all);



module.exports = router;