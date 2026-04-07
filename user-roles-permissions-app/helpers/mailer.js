const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

const sendEmail = async ({ to, subject, text, html, from }) => {
  try {
    const info = await transporter.sendMail({
      from: from || `"My App" <${process.env.SMTP_MAIL}>`,
      to,
      subject,
      text,
      html,
    })
    return info
  } catch (error) {
    throw error
  }
}

module.exports = { transporter, sendEmail }
