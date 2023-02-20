const Posts = require('../models/Post');


module.exports = {

    create: async function (req, res) {

        const blogPost = new Posts({
         title: req.body.title,
          text: req.body.text
      })
        // save post
      await blogPost.save();

    }
      
}
