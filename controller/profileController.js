exports.getProfile = (req,res)=>{
    const query = 'select * from usersdetails where user_id=?'
    db.query(query,[[req.session.thisuser]],(err,result)=>{
        if(err) throw err;

        if(result[0].user_image===''){
            result[0].user_image = 'defultPicture.png'
            console.log(result[0])
        }
        console.log(result[0])
        res.render('profile',{userdata:result});
    })
}
