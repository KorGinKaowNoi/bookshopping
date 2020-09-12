const express = require('express');
const router  = express.Router();
const addshop = require('../controller/addShopController');
const buybook = require('../controller/buyBookController');
router.get('/',addshop.showMarket);
router.get('/add/:id',addshop.addtocart);
router.post('/add/',addshop.cartToMarket);
router.post('/:id',buybook.checkAndBuy);

module.exports = router;
