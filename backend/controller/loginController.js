const bcrypt = require('bcrypt');
exports.login = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let query = "select user_name,user_password,user_id from reader where user_name = ?"
    db.query(query,[username], async (err,result)=>{
        if(err){
            req.flash('danger',err.sqlMessage)
            res.redirect('/');
        }else{
            if(result.length>0){
                const comparable = await bcrypt.compare(password,result[0].user_password)
                if(comparable){
                    const sess = req.session;
                    sess.allow = true;
                    sess.thisuser = result[0].user_id;
                    req.session.save();
                    req.flash('success','you logged in');
                    res.redirect('/');
                }else {
                    req.flash('danger','password and username not match');
                    res.redirect('/users/login');
                }
            }else{
                req.flash('danger','something went wrong');
                res.redirect('/users/register')
            }
        }
    })
}
exports.logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });

}