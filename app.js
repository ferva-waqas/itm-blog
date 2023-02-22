const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var passport = require("passport");
var {config} = require('./config/index');
const multer  = require('multer')
const app = express();

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

const MONGODB_URI = `${config.DATABASE_URL}:${config.DATABASE_PORT}/${config.DATA_BASENAME}`;


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');


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
app.use('/api/v1',postRoutes);



mongoose
.connect(MONGODB_URI, { useFindAndModify: false })
.then(result => {
    app.listen(config.SERVER_PORT);
  })
  .catch(err => {
    console.log(err);
  });
