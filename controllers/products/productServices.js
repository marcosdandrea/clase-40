const argv = require('minimist')(process.argv.slice(2));
const productsFactoryDAO = require("./ProductsFactoryDAO")

const persitencyMode = argv.persistency || "mongo"
const productsDAO = new productsFactoryDAO.create(persitencyMode)

const Logger = require("../../services/Logger")
const logger = new Logger()

async function getAllProducts(req, res, next) {
    try {
        const DTO = await productsDAO.getAllProducts()
        res.status(200).send(JSON.stringify(DTO))
    } catch (err) {
        res.status(500).send(JSON.stringify(err))
        logger.logError(err)
    }
}

async function saveNewProduct(req, res, next) {
    try {
        const { file } = req;

        const title = req.query.title || req.body.title
        const price = parseFloat(req.query.price) || parseFloat(req.body.price)
        const imgDir = "../images/products/"
        const image = imgDir + file.filename
        const newProduct = { title, price, image }

        if ((title == undefined) || (price == undefined) || (image == undefined) || (isNaN(price))) {
            res.status(404).send(JSON.stringify({ error: "datos incorrectos" }))
            return
        }
        const DTO = await productsDAO.saveProduct(newProduct)
        res.status(200).send(JSON.stringify(DTO))
    } catch (err) {
        console.log(err)
        logger.logError("error", err.message)
        res.status(501).send(JSON.stringify({ error: 'producto no agregado' }))
    }
}

module.exports = { getAllProducts, saveNewProduct }