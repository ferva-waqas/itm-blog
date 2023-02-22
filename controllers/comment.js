const mongoose = require('mongoose');
const Comment = require("../models/Comments");
const Posts = require("../models/Post");
var Users = require('../models/User');

module.exports = {
    create: async function (req, res) {
        // staffByRight: async(req,res) =>{
        //     const rightData = await Right.find(  { _id : req.body.right_id}  ).populate('staff_id');
        //     res.send(rightData) ;
        // }
        const postId = req.params.post_id;
        const userId = req.params.user_id;

        // const userdata = await Posts.find({userId},).populate('user_id');
        //     console.log(userdata);
        //     res.send(userdata);
        // find out which post you are commenting


        // // get the comment text and record post id
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
                    user: userId
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

    deleteComment: async function (req, res) {

        const commentId = req.params.comment_id;
        const postId = req.params.post_id;
        const userId = req.params.user_id;
        console.log(commentId + " " + postId + " " + userId);

        if (mongoose.Types.ObjectId.isValid(commentId) &&
            mongoose.Types.ObjectId.isValid(postId) &&
            mongoose.Types.ObjectId.isValid(userId)
        ) {
            const userData = await Users.findById(userId);
            if (userData) {

                const postData = await Posts.findById(postId);
                if (postData) {

                    // both user and post exist, delete comment here
                    const deletedComment = await Comment.findByIdAndDelete(commentId);

                    if (deletedComment == null) {

                        return res.status(202).json({
                            success: false,
                            message: 'Comment already deleted',
                            deletedComment: deletedComment,
                        });
                    }
                    else {

                        return res.status(202).json({
                            success: true,
                            message: 'Comment deleted',
                            deletedComment: deletedComment,
                        });
                    }

                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Post not found',
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Invalid comment ID ,user ID or post ID',
            });
        }


    },

    updateComment: function(req,res){

        res.send("good");
    }

}

//     updateComment: async function (req, res) {
//         const commentId = req.params.comment_id;
//         const postId = req.params.post_id;
//         const userId = req.params.user_id;
//         const update = req.body.text;
//         console.log(commentId + " " + postId + " " + userId + " " + update);

//         if (mongoose.Types.ObjectId.isValid(commentId) &&
//             mongoose.Types.ObjectId.isValid(postId) &&
//             mongoose.Types.ObjectId.isValid(userId)) {
//             const userData = await Users.findById(userId);
//             if (userData) {

//                 const postData = await Posts.findById(postId);
//                 if (postData) {

//                     // both user and post exist, update comment here
//                     const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });

//                     if (updatedComment == null) {

//                         return res.status(404).json({
//                             success: false,
//                             message: 'Comment not found',
//                         });
//                     } else {

//                         return res.status(200).json({
//                             success: true,
//                             message: 'Comment updated',
//                             updatedComment: updatedComment,
//                         });
//                     }

//                 } else {
//                     return res.status(404).json({
//                         success: false,
//                         message: 'Post not found',
//                     });
//                 }
//             } else {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'User not found',
//                 });
//             }
//         }
//         else {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid comment ID ,user ID or post ID',
//             });
//         }
//     }

// };


    // showComments: async function (req, res) {
    //     try {
    //         const allComments = await Comment.find({});
    //         return res.status(202).json({
    //             success: true,
    //             data: {
    //                 allComments: allComments,
    //             },
    //         });
    //     } catch (err) {
    //         return res.status(400).json({
    //             success: false,
    //             error: err,
    //         });
    //     }
    // },

