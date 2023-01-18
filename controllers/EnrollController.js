const connection = require("../config/configDB");
const transporter = require("../config/mailConfig");

module.exports = (req, resp) => {

    const { name, email, phone, course, message } = req.body;
    var success = 0;
    const mailId = email
    // `admin@ikorepilates.com`
    if (name && email && phone && course && message) {
        success = connection.query("insert into user(Name,Email_id,Phone_no,message,course) values(?,?,?,?,?)", [name, email, phone, message, course], (error) => {
            if (error)
                throw error;
        });
    }
    
    if (success) {
        const emailConfig = {
            from: 'no-reply@ikorepilates.com',
            to: ['admin@ikorepilates.com'],
            subject: `Contact Details of ${name}`,
            //text: `Thank you for contacting us. We will get back to you soon`,
            html: `<p>Dear Admin</p>
            
            <b>please check below contact details</b>
            <p>name: ${name}</p>
                <p>email: ${mailId}</p>
                <p>phone: ${phone}</p>
                <p>Course: ${course}</p>`


        }

        const emailConfig2 = {
            from: 'no-reply@ikorepilates.com',
            to: [mailId],
            subject: `iKore Pilates : Thank you for Registration`,
            //text: `Thank you for contacting us. We will get back to you soon`,
            html: `<p>Dear ${name}</p>
            
            <span>Thank you for showing interest. Our team will get in touch with you shortly.</span>


            <br></br>
            <br></br>

            <p>Thanks</p>
            <p>Team iKore</p>`




        }
        transporter.sendMail(emailConfig, (error, info) => {
            if (error) {
                console.log(error)
                throw error;
            }
            else
                console.log(info);
        })
        transporter.sendMail(emailConfig2, (error, info) => {
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