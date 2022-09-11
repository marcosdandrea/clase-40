
function create(type) {
    if (type === "mongo") return require("./UsersDAO_mongo")
    if (type === "memory") return require("./UsersDAO_mem")
    if (type === "filesystem") return require("./UsersDAO_filesystem")
}


module.exports = productsFactoryDAO = { create }