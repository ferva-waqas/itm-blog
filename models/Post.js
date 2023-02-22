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
           user :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           },
         // a blog post can have multiple comments, so it should be in a array.
         // all comments info should be kept in this array of this blog post.
          comments: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment'
           }]
           }, { timestamps: true })

          //  postSchema.virtual('url').get(function(){
          //     return '/post/' + this._id
          //  })

         module.exports = mongoose.model('Post', postSchema);
