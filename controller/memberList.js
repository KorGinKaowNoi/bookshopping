exports.member = (req,res) =>{
    const query = 'select * from usersdetails';
    db.query(query,(err,result)=>{
        if(err){
            throw err;
        } 
        res.render('memberList',{
            member:result
        });
    });
}
exports.deleteMember = (req,res) =>{
    const query = 'delete from usersdetails where user_id=?';
    db.query(query,[req.params.id],(err, result)=>{
        if(err){
            throw err;
        }
        req.flash('success','delete success!')
        res.redirect('/admin/memberList');
    }) ;
}
exports.getUserEdit = (req,res) =>{
    const user_id = req.params.id;
    const query = 'select * from usersdetails where user_id=?';
    db.query(query,[user_id],(err,result)=>{
        if(err){
            throw err;
        }
        res.render('adminEdit',{
            userdata:result
        });
    });
}
exports.EditUser = (req,res) =>{
    const user_id = req.body.userid;
    const name = req.body.name;
    const money = req.body.money;
    const tier = req.body.tier;
    const query = 'update usersdetails set user_name=?,user_balance=?,userTier=?' +
        'where user_id=?';
    db.query(query,[name,money,tier,user_id],(err,result)=>{
        if(err){
            throw err;
        }
        req.flash('success','reader data is updated');
        res.redirect('/admin/memberList');
    })
}