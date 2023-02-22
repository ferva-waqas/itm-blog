const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordKey: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  post: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
},
{ timestamps: true }
);


module.exports = mongoose.model('User', userSchema);