// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

/* const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
} */

const sendEmail = async msg => {
  const email = { ...msg, from: SENDGRID_SENDER_EMAIL }
  await sgMail.send(email)
  return true
}

module.exports = sendEmail
