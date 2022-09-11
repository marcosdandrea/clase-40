require("dotenv").config()
const crypto = require("crypto")
let products = []

async function saveProduct(productObject) {
    productObject.id = crypto.randomUUID()
    products.push(productObject)
    return (productObject.id)
}

async function getAllProducts() {
    return (products)
}


module.exports = productsDAO = {saveProduct, getAllProducts}