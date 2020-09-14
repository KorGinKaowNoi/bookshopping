exports.search = (req,res)=>{
    const word = req.body.search;
    const query = 'select book_price,tag,book_description,book_image,bookname,SSID from shopcart'+
    ' inner join bookdetails using(ssid)'+
   'where bookname=? or tag = ?'
    db.query(query,[word,word],(err,result)=>{
        if(err) throw err;
        req.flash('success',`result for ${word}`);
        res.render('guest',{bookdetail:result,owner:'guest'});
    })

}