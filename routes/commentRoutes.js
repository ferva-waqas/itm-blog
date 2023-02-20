const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/post/:id/comment', commentController.create);

module.exports = router;