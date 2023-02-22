const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();

router.post('/:user_id/post', postController.create);

module.exports = router;