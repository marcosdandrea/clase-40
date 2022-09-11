require("dotenv").config()
const fs = require("fs").promises
const crypto = require("crypto")

const filename = "productsDatabaseFs.json"

async function saveProduct(productObject) {
    try {
        await fs.access(filename)
            .catch(async (err) => {
                if (err.code !== "ENOENT") throw new Error("Can't access product database")
                await fs.writeFile(filename, JSON.stringify([]))
            })

        const dbFilesystem = await fs.readFile(filename, 'UTF-8')
        const dbParsed = JSON.parse(dbFilesystem)
        productObject.id = crypto.randomUUID()
        dbParsed.push(productObject)
        await fs.writeFile(filename, JSON.stringify(dbParsed))
        return (productObject.id)
    } catch (err) {
        throw new Error("Can't access products database")
    }
}

async function getAllProducts() {
    try {
        const dbFilesystem = await fs.readFile(filename, 'UTF-8')
        const dbParsed = JSON.parse(dbFilesystem)
        return (dbParsed)
    } catch (err) {
        if (err.code === "ENOENT") return ([])
    }
}


module.exports = productsDAO = { saveProduct, getAllProducts }