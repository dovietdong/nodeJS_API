const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodejs_movie'
})

db.connect(function(err){
    if(err){
        throw new Error;
    }
})

module.exports = db // ?