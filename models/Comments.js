const mongoose = require('mongoose');

        const commentSchema = new mongoose.Schema({
         text: {
              type: String,
              trim: true,
              required: true
           },
       // each comment can only relates to one blog, so it's not in array
        post: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Post'
           }
         }, { timestamps: true })

        module.exports = mongoose.model('Comment', commentSchema);