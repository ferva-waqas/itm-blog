const Posts = require('../models/Post');


module.exports = {

    create: async function (req, res) {
     console.log(req.body);
        const blogPost = new Posts({
         title: req.body.title,
          text: req.body.text
      })
        // save post
      await blogPost.save();
      res.send("your post has been added");
    }
      
}
