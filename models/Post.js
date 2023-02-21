const mongoose = require('mongoose');

        const postSchema = new mongoose.Schema({
           title: {
             type: String,
             trim: true,
              required: true
           },
           text: {
             type: String,
             trim: true,
             required: true
           },
           
         // a blog post can have multiple comments, so it should be in a array.
         // all comments info should be kept in this array of this blog post.
          comments: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment'
           }]
           }, { timestamps: true })

<<<<<<< HEAD
          //  postSchema.virtual('url').get(function(){
          //     return '/post/' + this._id
          //  })

=======
>>>>>>> 3c7bb51d34f183c395e75de998952a79ac63fee3
         module.exports = mongoose.model('Post', postSchema);
