var pool = require('./bd');
var md5 = require('md5');


async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = 'SELECT * FROM login WHERE user = ? AND password = ? LIMIT 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserByUsernameAndPassword }