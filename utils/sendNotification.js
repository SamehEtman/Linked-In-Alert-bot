const nodemailer = require('nodemailer');
const { fromEmail, password , toEmail } = require('./secret');
const makeHTML = require('./makeHTML');

module.exports = async function sendNotification(num , jobs , referer) {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: fromEmail,
      pass: password,
    },
  });

  let htmlText = makeHTML(num , jobs,referer);

  let info = await transporter.sendMail({
    from: `"Sameh LinkedIn bot" <${fromEmail}>`,
    to: toEmail,
    subject: `Linked In jobs`,
    html: htmlText,
  });

  console.log('Email sent');
};
