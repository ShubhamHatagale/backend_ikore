const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',

    port: 2525,

    auth: {
        user: process.env.email_user,
        pass: process.env.email_password
    }
});
module.exports = transporter;