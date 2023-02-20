const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  des: {
    type: String,
    required: false
  },
  post_id: {
    type: ObjectId
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });






module.exports = mongoose.model('Comment', commentSchema);