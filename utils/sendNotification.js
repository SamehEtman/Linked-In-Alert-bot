const nodemailer = require('nodemailer');
const { myEmail, password } = require('./secret');
const makeHTML = require('./makeHTML');

module.exports = async function sendNotification(num , jobs , referer) {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: myEmail,
      pass: password,
    },
  });

  let htmlText = makeHTML(num , jobs,referer);

  let info = await transporter.sendMail({
    from: `"Sameh LinkedIn bot" <${myEmail}>`,
    to: 'sameh.ot.28@gmail.com',
    subject: `Linked In jobs`,
    html: htmlText,
  });

  console.log('Message sent: %s', info.messageId);
};
