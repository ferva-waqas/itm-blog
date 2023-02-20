const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var passport = require("passport");
var {config} = require('./config/index');
const multer  = require('multer')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const Posts = require('./models/Post')
const Comment = require('./models/Comments');

const MONGODB_URI = `${config.DATABASE_URL}:${config.DATABASE_PORT}/${config.DATA_BASENAME}`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/commentRoutes');
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: config.SERVER_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use('/api/v1',authRoutes);
app.use('/api/v1',commentRoutes);

app.post('/post/:id/comment', async (req, res) => {
  // find out which post you are commenting
  
  const id = req.params.id;
  // get the comment text and record post id
  const blogPost =  await Posts.find({});

  console.log(blogPost);
  
  const comment = new Comment({
   text: req.body.comment,
   post: id
})
  // save comment
await comment.save();
  // get this particular post
const postRelated = await blogPost[0];
  // push the comment into the post.comments array
postRelated.comments.push(comment);
  // save and redirect...
await postRelated.save(function(err) {
if(err) {console.log(err)}
res.status(200)
})

})

app.post('/post/:id', async (req, res) => {
  // find out which post you are commenting
   const id = req.params.id;
  // get the comment text and record post id
   const blogPost = new Posts({
   title: req.body.title,
    text: req.body.text
})
  // save comment
await blogPost.save();
  // get this particular post
//const postRelated = await Post.findById(id);
  // push the comment into the post.comments array
//postRelated.comments.push(comment);
  // save and redirect...
//await postRelated.save(function(err) {
//if(err) {console.log(err)}
//res.redirect('/')
})



mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(config.SERVER_PORT);
  })
  .catch(err => {
    console.log(err);
  });
