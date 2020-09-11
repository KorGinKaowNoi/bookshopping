exports.checkAuth = (req,res,next)=>{
    if(!req.session.thisuser){
        req.flash('danger','please login');
        res.redirect('/users/login');
    }else{
        next();
    }
}