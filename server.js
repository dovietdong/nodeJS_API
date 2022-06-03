//tao cac doi tuong tu thu vien
const express = require('express');
const ejs = require('ejs')
const body_parser = require('body-parser')
var cors = require('cors')

//bien app de su dung cac phuong thuc cua express
var app = express()

//cac phuong thuc cua express
app.set('view engine', 'ejs')// cau hinh cho view engine
app.use(express.static('public'))// cau hinh cho static file
app.use(body_parser.json())// lấy dữ liệu dạng json từ phía client gửi lên server
//app.use(body_parser.urlencoded({extended:true}))// lấy dữ liệu từ form POST 
//router
//require('./routes/home.router')(app)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE, PUT');
    next();
 });

require('./routes/category.router')(app)
require('./routes/product.router')(app)
require('./routes/account.router')(app)
require('./routes/favorite.router')(app)

app.get('', function(req, res){
    res.render('index')
})
app.get('/live', function(req, res){
    res.render('live')
})
app.get('/signin', function(req, res){
    res.render('signin')
})
app.get('/signup', function(req, res){
    res.render('signup')
})
app.get('/admin', function(req, res){
    res.render('admin')
})

//tao server nodeJS cong 3000
app.listen(3000, function(req, res){
    console.log('server start at http://localhost:3000')
})
