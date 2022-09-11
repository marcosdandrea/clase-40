const {checkAdminAuthorization} = require("../../services/authorizationCheck")

function configPanelAPI(app) {

    app.get('/panel', checkAdminAuthorization)


}

module.exports = configPanelAPI