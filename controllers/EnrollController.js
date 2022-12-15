const connection = require("../config/configDB");
const transporter = require("../config/mailConfig");

module.exports = (req, resp) => {
    const { name, email, phone, course, message } = req.body;
    var success = 0;
    if (name && email && phone && course && message) {
        success = connection.query("insert into user(Name,Email_id,Phone_no,message,course) values(?,?,?,?,?)", [name, email, phone, message, course], (error) => {
            if (error)
                throw error;
        });

    }
    if (success) {
        const emailConfig = {
            from: process.env.email_user,
            to: email,
            subject: 'feedback email',
            text: "Thank you for contacting us. We will get back to you soon"
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