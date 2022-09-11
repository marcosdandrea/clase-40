require("dotenv").config()
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbUrl = process.env.MONGO_URL;

const connect = () => {
    return new Promise(async (resolve, reject) => {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on("error", () => {
            console.log(`pid ${process.pid}> No se pudo conectar a la base de datos`);
            reject()
        });
        db.once("open", () => {
            console.log(`pid ${process.pid}> Conectado a la base de datos`);
            resolve()
        });
    })
};
module.exports = database = { connect };