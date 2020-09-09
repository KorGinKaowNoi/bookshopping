const express = require('express');
const router = express.Router();
const memberList = require('../controller/memberList');
router.get('/memberList',memberList.member);
module.exports = router;