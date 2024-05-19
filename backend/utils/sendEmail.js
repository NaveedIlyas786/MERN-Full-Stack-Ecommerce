const nodeMailer = require("nodemailer"); //? this is default fucntion of node js to send email

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({

        service: "gmail",  //? means *simple mail transfer protocol* we shall replace this service as well as others with dynamic and flexible Mail data using "process.env" in config.env
        host: "smtp.gmail.com",   //! If your email not send then add these two lines *Host* and *Port* and install *NodeMailer* also using npm
        port: 465,
        secure: true,
        
        auth:{
            user:"naveedilyas321@gmail.com",
            pass:"nezr xkve dsgl rcqj",
        }
        
    });

    const mailOptions = {
        from: "naveedilyas321@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;







