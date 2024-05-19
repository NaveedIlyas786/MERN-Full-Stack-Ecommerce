const nodeMailer = require("nodemailer"); //? this is default fucntion of node js to send email

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({

        service:process.env.SMTP_SERVICE,  //? means *simple mail transfer protocol* we shall replace this service as well as others with dynamic and flexible Mail data using "process.env" in config.env
        host:process.env.SMTP_HOST,   //! If your email not send then add these two lines *Host* and *Port* and install *NodeMailer* also using npm
        port: process.env.SMTP_PORT,
        secure: true,
        
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
        
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;







