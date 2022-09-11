const Logger = require("../services/Logger")
const logger = new Logger()

function checkUserAuthorization(req, res, next) {
    if (req.user?.level == "admin" || req.user?.level == "user") {
        next()
    } else {
        logger.logWarn("error", "Access denied")
        res.status(401).send("Access denied")
    }
}

function checkAdminAuthorization(req, res, next) {
    if (req.user?.level == "admin") {
        next()
    } else {
        logger.logWarn("error", "Access denied")
        res.redirect("/notAllowed.html")
    }
}

module.exports = { checkAdminAuthorization, checkUserAuthorization }