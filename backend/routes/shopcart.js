const express = require('express');
const router  = express.Router();
const addshop = require('../controller/addShopController');
router.get('/',(req,res)=>{
    res.send('hello')
})
router.get('/add/:id',addshop.addtocart);
router.post('/add/',addshop.cartToMarket);
module.exports = router;