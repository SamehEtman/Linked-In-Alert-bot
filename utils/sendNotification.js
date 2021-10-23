const nodemailer = require('nodemailer');
const { fromEmail, password, toEmail } = require('./secret');
const makeHTML = require('./makeHTML');

module.exports = async function sendNotification(num, jobs, referer) {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: fromEmail,
      pass: password,
    },
  });

  let htmlText = makeHTML(num, jobs, referer);
  try {
    let info = await transporter.sendMail({
      from: `"LinkedIn Alert bot" <${fromEmail}>`,
      to: toEmail,
      subject: `Linked In jobs`,
      html: htmlText,
    });
    console.log('Email sent');
  } catch (e) {
    throw new Error(e);
  }
};
