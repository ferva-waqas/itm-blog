const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/post/:postId/comment', commentController.create);

router.post('/comment/delete', commentController.deleteComment);

router.post('/comment/update', commentController.updateComment);

router.post('/comment/show', commentController.showComments);


module.exports = router;