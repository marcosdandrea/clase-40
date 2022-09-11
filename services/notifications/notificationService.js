require("dotenv").config()
const Logger = require("../Logger")
const twilio = require("twilio")
const sendMail = require("./NodeMailer.js")
const logger = new Logger()

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_ACCOUNT_AUTHTOKEN
    )

async function sendNewOrderNotification(order, userData) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: "Servidor Backend",
            to: process.env.NOTIFICATION_EMAIL,
            subject: "Nuevo pedido de " + userData.alias + " (" + userData.username + ")",
            html: generateHTMLOrderView(order)
        }

        sendMail(mailOptions)
        const customerPhone = "+" + userData.telephone
        sendWsp(process.env.TWILIO_PHONE_NUMBER, customerPhone, generatePlainOrderView(order))
        const rand = Math.floor(Math.random() * 548648464)
        sendSms("+" + userData.telephone, "Su pedido número " + rand + " está siendo procesado.")
        resolve()
    })
}

async function sendWsp(from, to, body) {
    await client.messages
        .create({
            body,
            from: 'whatsapp:' + from,
            to: 'whatsapp:' + to
        })
        .catch(err => {
            logger.logWarn("Twilio Warning", err.message)
            console.log (err)
        })
        .done()
}

async function sendSms(to, body) {
    await client.messages
        .create({
            body,  
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,      
            to
        })
        .catch(err => logger.logWarn(err))
        .done()
}

function generateHTMLOrderView(order) {
    let view = "<h3> ++ NEW ORDER ++ </h3>"
    order.forEach(item => {
        view += "<p>=================================</p>"
        view += "<p>ID: " + item.productID + "</p>"
        view += "<p>Name: " + item.productName + "</p>"
        const total = parseInt(item.productAmount) * parseFloat(item.productPrice.slice(1))
        view += "<p>" + item.productAmount + " x (" + item.productPrice + ") $" + total + "</p>"
    })
    view += "<p>===============END===============</p>"
    return view
}

function generatePlainOrderView(order) {
    let view = "++ NEW ORDER ++ \n"
    order.forEach(item => {
        view += "=================================\n"
        view += "ID: " + item.productID + "\n"
        view += "Name: " + item.productName + "\n"
        const total = parseInt(item.productAmount) * parseFloat(item.productPrice.slice(1))
        view += "" + item.productAmount + " x (" + item.productPrice + ") $" + total + "\n"
    })
    view += "===============END===============\n"
    return view
}

module.exports = { sendNewOrderNotification }