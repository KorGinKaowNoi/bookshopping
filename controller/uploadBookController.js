
exports.uploadBook = (req,res)=>{
    const ISBN = req.body.isbn;
    const bookname = req.body.bookname;
    const userid = req.session.thisuser;
    const image = req.files.image;
    if(image.mimetype==='image/jpeg'||image.mimetype==='image/png'){
        image.mv('public/images/bookpicture/'+image.name,(err)=>{
            if(err) throw err;
            let query = 'insert into bookdetails (SSID,bookname,book_image,user_id,onMarket) values?'
            const values =[[ISBN,bookname,image.name,userid,'no']]
            db.query(query,[values],(err)=>{
                if(err){
                    console.log(ISBN,bookname,image.name,userid)
                    throw err
                }else{
                    req.flash('success','your book has been upload');
                    res.redirect('/');
                }
            })
        })
    }else{
        req.flash('danger','our website not support this type of picture');
        res.redirect('/users/'+req.session.thisuser+'/addBook')
    }
};
exports.getBook = (req,res)=>{
    const id = req.session.thisuser;
    const query = 'select * from bookdetails where user_id =? and onMarket=?'
    db.query(query,[id,'no'],(err,result)=>{
        if(err) throw err;
        console.log(result)
        res.render('mybook',{usersbook:result})
    })
}
