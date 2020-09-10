const express = require('express');
const router = express.Router();
const memberList = require('../controller/memberList');
router.get('/memberList',memberList.member);
router.get('/:id/delete',memberList.deleteMember);
router.get('/:id/edit',memberList.getUserEdit);
router.post('/edited',memberList.EditUser);
module.exports = router;