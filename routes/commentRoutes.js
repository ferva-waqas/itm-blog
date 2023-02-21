const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

<<<<<<< HEAD
router.post('/post/:id/comment', commentController.create);
router.delete('/post/:id/:comment_id/delete' , commentController.delete);
=======
router.post('/post/:postId/comment', commentController.create);

router.post('/comment/delete', commentController.deleteComment);

router.post('/comment/update', commentController.updateComment);

router.post('/comment/show', commentController.showComments);

>>>>>>> 3c7bb51d34f183c395e75de998952a79ac63fee3

module.exports = router;