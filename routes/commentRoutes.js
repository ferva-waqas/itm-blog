const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/post/:postId/comment', commentController.create);

module.exports = router;