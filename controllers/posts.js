const Posts = require("../models/Post");

module.exports = {
  create: function (req, res) {
    const blogPost = new Posts({
      title: req.body.title,
      text: req.body.text,
    });
    //     // save post

<<<<<<< HEAD
    create: async function (req, res) {
     console.log(req.body);
        const blogPost = new Posts({
         title: req.body.title,
          text: req.body.text
      })
        // save post
      await blogPost.save();
      res.send("your post has been added");
    }
      
}
=======
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
>>>>>>> 3c7bb51d34f183c395e75de998952a79ac63fee3
