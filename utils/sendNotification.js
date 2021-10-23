const nodemailer = require('nodemailer');
const { myEmail, password } = require('./secret');

module.exports = async function sendNotification(num , jobs) {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: myEmail,
      pass: password,
    },
  });


  let info = await transporter.sendMail({
    from: `"Sameh LinkedIn bot" <${myEmail}>`,
    to: 'sameh.ot.28@gmail.com',
    subject: `Linked In jobs`,
  });

  console.log('Message sent: %s', info.messageId);
};
