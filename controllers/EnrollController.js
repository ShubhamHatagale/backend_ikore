const connection = require("../config/configDB");
const transporter = require("../config/mailConfig");

module.exports = (req, resp) => {
    const { name, email, phone, course, message } = req.body;
    var success = 0;
    const mailId=`admin@ikorepilates.com`
    if (name && email && phone && course && message) {
        success = connection.query("insert into user(Name,Email_id,Phone_no,message,course) values(?,?,?,?,?)", [name, email, phone, message, course], (error) => {
            if (error)
                throw error;
        });

    }
    if (success) {
        const emailConfig = {
            from: process.env.email_user,
            to: mailId,
            subject: 'feedback email',
            text: `Thank you for contacting us. We will get back to you soon`,
            html:`<p>Dear ${name}</p>
            <b>Thank you for contacting us. We will get back to you soon</b>
            <p>name: ${name}</p>
                <p>email: ${mailId}</p>
                <p>phone: ${phone}</p>
                <p>Course: ${course}</p>
            <p>Please also be sure to visit our <a href="http://phpstack-895831-3108674.cloudwaysapps.com/">FAQs</a> </p>
            <br/><p>Thank you for your patronage</p>
            <p>ikore pilates Team</p>
            <p> <a href="http://phpstack-895831-3108674.cloudwaysapps.com/">ikore pilates</a></p>`
        }
        transporter.sendMail(emailConfig, (error, info) => {
            if (error) {
                console.log(error)
                throw error;
            }
            else
                console.log(info);
        })
        resp.send({ msg: "email sent sucessfully" });
    }
}