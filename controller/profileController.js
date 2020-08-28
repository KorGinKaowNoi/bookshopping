exports.getProfile = (req,res)=>{
    const query = 'select * from usersdetails where user_id=?'
    db.query(query,[[req.session.thisuser]],(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render('profile',{userdata:result});
    })
}