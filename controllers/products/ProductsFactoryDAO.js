
function create(type) {
    if (type === "mongo") return require("./productsDAO_mongo")
    if (type === "memory") return require("./productsDAO_mem")
    if (type === "filesystem") return require("./productsDAO_filesystem")
}


module.exports = productsFactoryDAO = { create }