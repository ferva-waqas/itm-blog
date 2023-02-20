const Comment = require('../models/Comments');
const Posts = require('../models/Post');

module.exports = {

    create: async function (req, res){
        // find out which post you are commenting
        
        const id = req.params.id;
        // get the comment text and record post id
        const blogPost =  await Posts.findById(id);
      
        console.log(blogPost);
        
        const comment = new Comment({
         text: req.body.comment,
         post: id
      })
        // save comment
      await comment.save();
      // push the comment into the blogPost.comments array
   
     blogPost.comments.push(comment);
        
     // save and send status

      await blogPost.save(function(err) {
      if(err) {console.log(err)}
      res.status(200)
      })
      
      }
}
