const Logger = require("../../services/Logger")
const { sendNewOrderNotification } = require("../../services/notifications/notificationService")

const logger = new Logger()

async function createNewOrder(req, res, next) {
    try {
        const order = req.body[0]
        const userData = req.body[1]
        //-> Place order to database <-
    
        await sendNewOrderNotification(order, userData)
        res.sendStatus(200)

    } catch (err) {
        logger.logError("error", err)
        res.sendStatus(500)
    }
}

module.exports = orderServices = { createNewOrder }