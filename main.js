require("dotenv").config()

const express = require("express");
const http = require("http")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const argv = require('minimist')(process.argv.slice(2));
const PORT = process.env.PORT || 8080;
const processMode = argv.mode || "fork"
const Logger = require("./services/Logger")
const compression = require("compression")
const logger = new Logger()

const persitencyMode = argv.persistency || "mongo"
console.log ("Persistency mode set to", persitencyMode)

if (cluster.isPrimary && String(processMode).toLocaleLowerCase() == "cluster") {

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

} else {

    const session = require("express-session")
    const MongoStore = require('connect-mongo')
    const path = require('path');
    const app = express();
    const server = http.createServer(app)

    const database = require('./services/database');
    const configUsersAPI = require("./controllers/users/usersAPI");
    const configPanelAPI = require("./controllers/panel/panelAPI")
    const configMessagesAPI = require("./controllers/messages/messagesAPI")
    const configProductsApi = require("./controllers/products/ProductsAPI")
    const configOrdersAPI = require("./controllers/orders/ordersAPI");
    const passport = require("passport");

    if (process.env.GZIP == "true") { app.use(compression()); console.log("> Compresion habilitada") }

    app.use(logger.logRequest)

    app.use("/", express.static(path.join(__dirname, '/public')))

    const mongoUrl = process.env.MONGO_URL;
    const advancedOptions = { useNewUrlParse: true, useUnifiedTopology: true }
    app.use(session(    {
        store: MongoStore.create({ mongoUrl, advancedOptions }),
        secret: "marcos123",
        resave: true,
        rolling: true,
        cookie: { maxAge: parseInt(process.env.SESION_DURATION) },
        saveUninitialized: true,
    }))

    app.use(express.json())
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((error, req, res, next) => {
        console.log (error)
        logger.logError (error)
        res.status(500).send(error.message)
    })

    configProductsApi(app)
    configUsersAPI(app)
    configPanelAPI(app)
    configMessagesAPI(server)
    configOrdersAPI(app)

    app.use((req, res, next) => {
        logger.logWarn(req)
    })

    database.connect()
        .then(() => {
            server.listen(PORT, () => {
                console.log(`pid ${process.pid}> Servidor escuchando en puerto ${PORT}`);
            });
        })
}