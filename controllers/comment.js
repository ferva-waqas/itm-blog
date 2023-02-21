const Comment = require("../models/Comments");
const Posts = require("../models/Post");

module.exports = {
  create: function (req, res) {
    // find out which post you are commenting

    const postId = req.params.postId;
    // get the comment text and record post id
    Posts.findById(postId, async function (err, blogPost) {
      console.log(blogPost);
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        const comment = new Comment({
          text: req.body.comment,
          post: postId,
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

  deleteComment: function (req, res) {
    const commentId = req.body.commentId;

    Comment.findByIdAndDelete(commentId, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        return res.status(202).json({
          success: true,
          message: "comment deleted",
        });
      }
    });
  },

  updateComment: function (req, res) {
    const commentId = req.body.commentId;

    const newComment = req.body.comment;

    Comment.findByIdAndUpdate(
      commentId,
      { text: newComment },
      function (err, comment) {
        if (err) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        } else {
          return res.status(202).json({
            success: true,
            data: {
              updatedComment: comment,
            },
          });
        }
      }
    );
  },

  showComments: async function (req, res) {
    try {
      const allComments = await Comment.find({});
      return res.status(202).json({
        success: true,
        data: {
          allComments: allComments,
        },
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
};
