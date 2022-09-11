require("dotenv").config()
const Logger = require("../Logger")
const { createTransport } = require("nodemailer")

const logger = new Logger()

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
        user: process.env.AUTH_USERNAME,
        pass: process.env.AUTH_PASSWORD
    }
});

async function sendMail(mailOptions){
    try{
        const info = await transporter.sendMail(mailOptions)
    }catch(error){
        logger.logError("Error sending mail " + error)
    }
}

module.exports = sendMail