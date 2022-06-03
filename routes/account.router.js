const db = require('./../connect')//?

module.exports = function(app){
    //lấy danh sách
    app.get('/account', function(req, res){
        //res.render('account');
        let sql = 'SELECT * FROM accounts';
        db.query(sql, function(err, data){
            res.send({
                result : data,
                status : 0,
                statusCode : 200
            })
        })
    })
    //lấy danh mục theo id
    //lấy id dùng req.params
    //lấy value dùng req.query
    app.get('/account/:id', function(req, res){
        let id = req.params.id;
        let sql = 'SELECT * FROM accounts WHERE id = ?';
        db.query(sql,[id],function(err, data){
            res.send({
                result : data.length > 0 ? data[0] : null,
                status : 0,
                statusCode : 200
            })
        })
    })
    // thêm mới vào CSDL
    app.post('/account', function(req, res){
        let sql="INSERT INTO accounts SET ?";
        db.query(sql, req.body, function(err, data){
            if (err){
                res.send ({
                    result: err.sqlMessage,
                    status: 1,
                    statusCode: 500
                });
            }else{
                req.body.id=data.insertId;
                res.send({
                    result: req. body,
                    status: 0,
                    statusCode: 200
                });
            }
        })
    })

    //cập nhật CSDL
    app.put('/account/:id', function(req, res){
        let id = req.params.id 
        let sql="UPDATE accounts SET ? WHERE id = ?";
        db.query(sql,[req.body,id], function(err, data){
            if (err){
                res.send ({
                    result: err.sqlMessage,
                    status: 1,
                    statusCode: 500
                });
            }else{
                req.body.id=data.insertId;
                res.send({
                    result: req. body,
                    status: 0,
                    statusCode: 200
                });
            }
        })
    })
    //xóa theo id
    app.delete('/account/:id', function(req, res){
        let id = req.params.id;
        db.query('DELETE FROM accounts WHERE id = ?',[id],function(err, data){
            message = 'xoa thanh cong'
            //so sánh id với í trong bảng dl, nếu ko có thì ko xóa, nếu có thì cho xóa ?
            if(err){
                message ='co loi khi xoa, ma loi '+ err.code 
            }
            res.send({
                result : data.length > 0 ? data[0] : null,
                status : 0,
                statusCode : 200,
                message : message
            })
        })
    })
}
