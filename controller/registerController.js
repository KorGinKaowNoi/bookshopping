const uuid = require('uuid');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');
exports.checkValidate = [check('email','email is required').notEmpty(),
    check('username','username is required').not().isEmpty(),
    check('password','password is required').not().isEmpty(),
    check('conPass','confirm password is required').not().isEmpty()
];
exports.register = (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        let i=0;
        for(i;i<error.errors.length;i++){
            req.flash('danger',error.errors[i].msg);
        }
        res.redirect('/users/register');
    }else{
        console.log(error.mapped());
        const password = req.body.password;
        const confirm = req.body.ConPass;
        if(!(password===confirm)){
            console.log('something wrong',password,confirm)
            req.flash('danger','check your password and confirm password')
            res.redirect('/users/register');
        }else {
            const username =req.body.username;
            const email = req.body.email;
            const id = uuid.v4();
            bcrypt.hash(password,10,(err,hash)=>{
                let query = "insert into `reader` (user_name,user_password,user_email,user_id) values ?";
                let values = [[username,hash,email,id]]
                db.query(query,[values],(err,result)=>{
                    if(err){
                        throw err;
                    }else{
                    }
                })
                const querys = "insert into `usersdetails` (user_id,user_name,user_payment,user_image,userTier,user_balance) values ?";
                const valuess = [[id,"",0.0,"","bronze",0.0]]
                db.query(querys,[valuess],(err)=>{
                    if(err) throw err;
                    req.session.allow = false;
                    req.flash('success','register successfully');
                    res.redirect('/');
                })
            })
        }
    }
}
