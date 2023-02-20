const User = require('../models/User');
const Comment = require('../models/comment');
const { ObjectId } = require('mongodb');
const postObjectId = new ObjectId('6115b5d5d77f5b5d2771eab9');



module.exports = {

    create: function (req, res, err) {
        let user_id = req.params.user_id;
        User.findOne({ _id: user_id })
            .then((result) => {

                const newComment = new Comment({
                    des: 'This is a new comment',
                    post_id: postObjectId,
                    user_id: result._id
                });
                newComment.save()
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                res.send({
                    message: "comment added",
                    data: {}
                })
            }).catch((err) => {
                return res.send({
                    message: err.message,
                    data: err
                });


            })


    }
}
