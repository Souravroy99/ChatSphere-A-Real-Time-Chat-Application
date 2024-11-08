const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.route('/addMsg').post(messageController.addMessage);
router.route('/getMsg').post(messageController.getAllMessage);

module.exports = router;