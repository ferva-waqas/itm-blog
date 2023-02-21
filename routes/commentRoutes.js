const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/post/:id/comment', commentController.create);
router.delete('/post/:id/:comment_id/delete' , commentController.delete);

module.exports = router;