const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TransactionsController = require('../controllers/transactions');


router.post("/lending", checkAuth, TransactionsController.lending);

router.post("/buying", checkAuth, TransactionsController.buying);




module.exports = router;