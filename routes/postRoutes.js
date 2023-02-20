const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();

router.post('/post', postController.create);

module.exports = router;