const Posts = require("../models/Post");

module.exports = {
  create: function (req, res) {
    const blogPost = new Posts({
      title: req.body.title,
      text: req.body.text,
    });
    //     // save post

    blogPost.save(function (err, blogPost) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        return res.status(201).json({
          success: true,
          data: {
            blogPost: blogPost,
          },
        });
      }
    });
  },
};
