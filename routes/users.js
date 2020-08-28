const express  = require('express');
const router = express.Router();
const registerControll  = require('../controller/registerController');
const loginController = require('../controller/loginController');
const uploadBookController = require('../controller/uploadBookController');
const editprofile = require('../controller/editProfileController');
const profile = require('../controller/profileController');
router.get('/register',(req,res)=>{
    res.render('register');
});
router.post('/register',registerControll.register);

router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',loginController.login)
router.get('/logout',loginController.logout)
router.get('/:id/addBook',(req,res)=>{
    res.render('addBook');
});
router.route('/add').post(uploadBookController.uploadBook);
router.get('/:id/edit',editprofile.getEdit);
router.post('/edit',editprofile.edit);
router.get('/:id/profile',profile.getProfile);
router.get('/:id/mybook',uploadBookController.getBook)
module.exports = router;