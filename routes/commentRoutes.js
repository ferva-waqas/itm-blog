const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/:user_id/:post_id/comment', commentController.create);


router.delete('/:user_id/:post_id/:comment_id/delete', commentController.deleteComment);


 router.put('/:user_id/:post_id/:comment_id/update', commentController.updateComment);


module.exports = router;