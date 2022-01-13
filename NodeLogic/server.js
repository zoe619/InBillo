const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const transactionsRoutes = require('./api/routes/transactions')
const userRoutes = require('./api/routes/users')

dotenv.config();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/transactions', transactionsRoutes)
app.use('/users', userRoutes)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, UPDATE, PUT')
        res.status(200).json({})
    }
    next();
})


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



app.listen(port, () => {
    console.log(`server started at port: ${port}`);
})