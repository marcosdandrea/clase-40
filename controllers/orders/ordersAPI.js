require("dotenv").config()
const { checkUserAuthorization } = require("../../services/authorizationCheck")
const orderServices = require("./ordersServices")

module.exports = function configOrdersAPI(app) {

        app.post("/orders",
            checkUserAuthorization,
            orderServices.createNewOrder
        )
}