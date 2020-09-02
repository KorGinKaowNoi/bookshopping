exports.edit = (req,res)=>{
    const name = req.body.name;
    const balance = req.body.money;
    let imageprofile = req.files;
    if(!imageprofile){
        req.flash('danger','you have to choose file');
        res.redirect('/users/'+req.session.thisuser+'/edit');
    }else{
        imageprofile = imageprofile.image;
        const query = 'update usersdetails set user_name=?,user_balance=?,user_image=?' +
            'where user_id=?';
        if(imageprofile.mimetype==='image/jpeg'||imageprofile.mimetype==='image/png'){
            imageprofile.mv('/bookshoppingproject/public/images/userpicture/'+imageprofile.name,(err)=>{
                if(err) throw err;
                db.query(query,[name,balance,imageprofile.name,req.session.thisuser],(err)=>{
                    if(err) throw err;
                    req.flash('success','update your profile success!');
                    res.redirect('/');
                })
            })

        }else{
            req.flash('danger','not support this type of image');
            res.redirect('/users/'+req.session.thisuser+'/edit');
        }
    }
}
exports.getEdit = (req,res)=>{
    const id = req.params.id;
    const query = 'select * from usersdetails where user_id =?';
    db.query(query,[id],(err,result)=>{
        if(err) throw err;
        res.render('editprofile',{
            userdata:result
        })
    })
}