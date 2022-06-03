const db = require('../connect')//?

module.exports = function(app){
    //lấy danh sách
    app.get('/favorite', function(req, res){
        //res.render('favorite');
        let sql = 'SELECT * FROM favorites';
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
    app.get('/favorite/:id', function(req, res){
        let id = req.params.id;
        let sql = 'SELECT * FROM favorites WHERE id = ?';
        db.query(sql,[id],function(err, data){
            res.send({
                result : data.length > 0 ? data[0] : null,
                status : 0,
                statusCode : 200
            })
        })
    })
    // thêm mới vào CSDL
    app.post('/favorite', function(req, res){
        let sql="INSERT INTO favorites SET ?";
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
    app.put('/favorite/:id', function(req, res){
        let id = req.params.id 
        let sql="UPDATE favorites SET ? WHERE id = ?";
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
    app.delete('/favorite/:id', function(req, res){
        let id = req.params.id;
        db.query('DELETE FROM favorites WHERE id = ?',[id],function(err, data){
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
