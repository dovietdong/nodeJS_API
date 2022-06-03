const db = require('../connect')//?

module.exports = function(app){
    app.get('/product', function(req, res){
        let sql = 'SELECT * FROM products'
        db.query(sql, function(err,data){
            if(err){
                res.send({
                    Message : 'co loi xay ra ' + err.sqlMessage,
                    status: 1,
                    statusCode: 500
                })
            }else{
                res.send({
                    result : data,
                    status : 0,
                    statusCode : 200
                })
            }
        })
    })

    app.get('/product/:id', function(req, res){
        let sql = 'SELECT p.*, c.name as `cat_name` FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ? '
        db.query(sql, req.params.id ,function(err,data){
            if(err){
                res.send({
                    Message : 'co loi xay ra ' + err.Message,
                    status: 1,
                    statusCode: 500
                })
            }else{
                res.send({
                    result : data.length > 0 ? data[0] : null,
                    status : 0,
                    statusCode : 200
                })
            }
        })
    })

    app.post('/product', function(req, res){
        let sql = 'INSERT INTO products SET ?'
        db.query(sql, req.body, function(err, data){
            if(err){
                res.send({
                    Message : 'co loi xay ra ' + err.sqlMessage,
                    status: 1,
                    statusCode: 500
                })
            }else{
                req.body.id=data.insertId;
                res.send({
                    result : req.body,
                    status : 0,
                    statusCode : 200,
                    message : 'them moi thanh cong'
                })
            }
        })
    })

    app.put('/product', function(req, res){
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [req.body, req.body.id], function(err, data){
            if(err){
                res.send({
                    Message : 'co loi xay ra ' + err.sqlMessage,
                    status: 1,
                    statusCode: 500
                })
            }else{
                res.send({
                    result : req.body,
                    status : 0,
                    statusCode : 200,
                    message : 'cap nhat thanh cong'
                })
            }
        })
    })

    app.delete('/product/:id', function(req, res){
        let id = req.params.id
        sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, id,function(err){
            if(err){
                res.send({
                    message : 'co loi xay ra ' + err.sqlMessage
                })
            }
            else
                res.send('xoa thanh cong')
        } )
    })
}