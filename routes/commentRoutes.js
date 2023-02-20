const express = require('express');
const authController = require('../controllers/comment');
const router = express.Router();



router.post('/:user_id/create', authController.create);



module.exports = router;