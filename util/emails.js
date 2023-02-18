
const nodemailer = require('nodemailer');
// const ejs = require('ejs');
const {emailSecrets} = require('../config/index');
const {config} = require('../config/index');

const transport = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  auth: {
    user: emailSecrets.USER,
    pass: emailSecrets.PASS
  }
});



module.exports = sendEmail = (from, receiver, subject, data) => {

  console.log(emailSecrets);

    var mailOptions = {
        from: from,
        to: receiver,
        subject: subject,
        html: data
      };

      console.log('mailOptions', mailOptions)

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('EMAIL COULD NOT SEND', error);
        } else {
          console.log('EMAIL SEND', receiver);
        }
        
      });
    
}