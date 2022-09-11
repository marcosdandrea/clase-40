require("dotenv").config()
const mongoose = require("mongoose")
const product = require("../../database/models/productModel")

async function saveProduct(productObject) {
    await mongoose.connect(process.env.MONGO_URL)
    const newProduct = new product(productObject)
    await newProduct.save()
    mongoose.disconnect();
    return (newProduct._id)
}

async function getAllProducts() {
    await mongoose.connect(process.env.MONGO_URL)
    const allProducts = await product.find({})
    return (allProducts)
}


module.exports = {saveProduct, getAllProducts}