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