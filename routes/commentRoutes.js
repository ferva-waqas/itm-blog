const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/:user_id/:post_id/comment', commentController.create);


router.get('/update',function(req, res){
    res.send("good");
});  // wants to run this basic function

router.delete('/:user_id/:post_id/:comment_id/delete', commentController.deleteComment);


// router.post('/comment/show', commentController.showComments);


module.exports = router;