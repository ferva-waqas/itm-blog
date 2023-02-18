const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const validationError = require('../util/validations');
const shortid = require('shortid');
const { MongoCursorInUseError } = require('mongodb');
const jwt = require('jwt-simple');
const sendEmail = require('../util/emails');
const ejs = require('ejs');

exports.login = async (req, res, next) => {
    let { email, password} = req.body;

    User.findOne({email}, async function(err, user) {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        } else {
           let hashedPassword = user.password;
           let isMatched = await bcryptjs.compare(password, hashedPassword);
            if(isMatched) {
                var token = jwt.encode(user, 'HERE SECRET');

                return res.status(202).json({
                    success: true,
                    data: {
                        user: user,
                        token: token
                    } 
                })
            } else {
                return res.status(401).json({
                    success: false,
                    error: 'Password missmatch'
                })
            }
        }
    });    
}

exports.signup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const encryptedPassword = await bcryptjs.hash(password, 12);

    let isExist = await User.findOne({email});
    if(isExist) {
        return res.status(400).json({
            success: false,
            error: validationError([{
                fieldName: 'email', 
                errorType: 'Duplicate', 
                errorMessage: 'Email already exists'
            }])
        })
    }

    let user = new User({
        name: name,
        email: email,
        password: encryptedPassword
    })
    // TODO: is user does exists or not
    user.save
    (function(err, user){
        if(err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        } else {
            return res.status(201).json({
                success: true,
                data: {
                    user: user
                }
            })
        }
    });
}


exports.resetPassword = async (req, res, next) => {
    let { password} = req.body;
    let { token } = req.query
    console.log({resetPasswordKey: token});
    User.findOne({resetPasswordKey: token}, async function(err, user) {
        if(err || user == null) {
            return res.status(400).json({
                success: false,
                error: err
            })
        } else {
            const encryptedPassword = await bcryptjs.hash(password, 12);
            user.password = encryptedPassword;
            user.save(function(err, doc){
                if(err) {
                    return res.status(400).json({
                        success: false,
                        error: validationError([{
                            fieldName: 'general', 
                            errorType: 'Password did not reset', 
                            errorMessage: 'Password could not reset'
                        }])
                    })
                } else {
                    return res.status(202).json({
                        success: true,
                        data: {
                            user: user
                        } 
                    })
                }
            });
        }
    });    
}

// params token, 
// body password

// find user by token
//  YES
    // Generate new password by bcrypt
    // Return success
// NO
    // Token expired or does not exists

exports.forgotPassword = async (req, res, next) => {
    let { email } = req.body;
    console.log('EMAIL', email);
    User.findOne({email}, async function(err, user) {
        console.log(err);
        console.log(MongoCursorInUseError);
        if(err || user == null) {
          return  res.status(400).json({
                success: false,
                error: validationError([{
                    fieldName: 'email', 
                    errorType: 'Not found', 
                    errorMessage: 'User does not exist'
                }])
            })
        } else {
            user.resetPasswordKey = shortid.generate();
            user.save( async(err, data) => {
              if (err) {
                res.status(400).json({
                    success: false,
                    error: validationError([{
                        fieldName: 'general', 
                        errorType: 'Not saved', 
                        errorMessage: 'Reset password token could not generate'
                    }])
                })
              } else {

                let content = await ejs.renderFile(__dirname + '/../views/emails/reset-password.ejs', { token: user.resetPasswordKey },  {async: true});

                sendEmail(
                    'itm@systemsltd.com',
                    email,
                    'Reset password link', 
                    content);

                return res.status(200).json({
                    success: true,
                    data: {
                        user: user
                    }
                });
              }
            });
        }
    });
}