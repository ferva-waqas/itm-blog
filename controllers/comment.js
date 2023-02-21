const Comment = require("../models/Comments");
const Posts = require("../models/Post");

module.exports = {
  create: async function (req, res) {
    // find out which post you are commenting

    const id = req.params.id;
    // get the comment text and record post id
    const blogPost = await Posts.findById(id);
    Posts.findById(id, async function (err, blogPost) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        const comment = new Comment({
          text: req.body.comment,
          post: id,
        });
        // save comment
        await comment.save();
        // push the comment into the blogPost.comments array

        blogPost.comments.push(comment);

        // save and send status

        await blogPost.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        return res.status(202).json({
          success: true,
          data: {
            comment: comment,
            blogPost: blogPost,
          },
        });
      }
    });
  },
};
