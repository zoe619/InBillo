require('dotenv').config();
const mysql = require('mysql2');


var pool = mysql.createPool({
    connectionLimit: 100,
    connectTimeout: 10000,
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "inbillo",
});


module.exports = pool.promise();

// exports.getConnection = function(callback) {
//     pool.getConnection(function(err, conn) {
//         if (err) {
//             return callback(err);
//         }
//         callback(err, conn);
//         app.listen(port, () => {
//             console.log(`server started at port: ${port}`);
//         })
//     });
// };