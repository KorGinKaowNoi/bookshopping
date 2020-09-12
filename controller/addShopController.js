const uuid = require('uuid');
exports.addtocart = (req,res)=>{
    const id = req.params.id;
    const query = 'select * from bookdetails inner join usersdetails on bookdetails.user_id = usersdetails.user_id where SSID=?'
    db.query(query,[id],(err,result)=>{
        if(err) throw err;
        res.render('addtoshop',{bookdata:result});
    })
}
exports.cartToMarket = (req,res)=>{
    const ssid = req.body.ssid;
    const price = req.body.price;
    const userid = req.session.thisuser;
    const  description = req.body.description;
    const tag = req.body.tag;
    const orderid = uuid.v1();
    let query = 'insert into orderdetails(order_id,user_id,SSID) values?'
    db.query(query,[[[orderid,userid,ssid]]],(err)=>{
        if(err) throw err;
    })
     query = 'insert into shopcart(SSID,user_id,book_price,tag,book_description,order_id) values?'
    db.query(query,[[[ssid,userid,price,tag,description,orderid]]],(err)=>{
        if (err) throw err;
    })
    query = 'update bookdetails set onMarket=? where ssid =?'
    db.query(query,['yes',ssid],(err)=>{
        if(err) throw err;
        req.flash('success','your book have been upload to market');
        res.redirect('/');
    })

}
exports.showMarket = (req,res)=>{
    const query = 'select SSID,user_name,book_image,book_price,bookname from shopcart ' +
        'inner join usersdetails d using(user_id)' +
        'inner join bookdetails b using(SSID)'
    db.query(query,(err,result)=>{
        res.render('shopcart',{bookdetail:result});
    })
}
