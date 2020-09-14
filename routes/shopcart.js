const express = require('express');
const router  = express.Router();
const access = require('../controller/accessController')
const addshop = require('../controller/addShopController');
const buy = require('../controller/buyAndSellController');
router.get('/',access.checkAuth,addshop.showMarket);
router.get('/add/:id',access.checkAuth,addshop.addtocart);
router.post('/add/',addshop.cartToMarket);
router.post('/:id',access.checkAuth,buy.completeBuy);
module.exports = router;
