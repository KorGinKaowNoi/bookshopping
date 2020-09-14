const express  = require('express');
const router = express.Router();
const registerControll  = require('../controller/registerController');
const loginController = require('../controller/loginController');
const uploadBookController = require('../controller/uploadBookController');
const editprofile = require('../controller/editProfileController');
const profile = require('../controller/profileController');
const access = require('../controller/accessController');
const showhistory = require('../controller/userHistoryControl')
router.get('/register',(req,res)=>{
    res.render('register');
});
router.post('/register',registerControll.checkValidate,registerControll.register);

router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',loginController.login)
router.get('/logout',loginController.logout)
router.get('/:id/addBook',access.checkAuth,(req,res)=>{
    res.render('addBook');
});
router.post('/add',access.checkAuth,uploadBookController.uploadBook);
router.get('/:id/edit',access.checkAuth,editprofile.getEdit);
router.post('/edit',access.checkAuth,editprofile.edit);
router.get('/:id/profile',access.checkAuth,profile.getProfile);
router.get('/:id/mybook',access.checkAuth,uploadBookController.getBook);
router.get('/:id/history',access.checkAuth,showhistory.showHistory)
module.exports = router;
