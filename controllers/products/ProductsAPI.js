const multer = require("multer");
const { checkAdminAuthorization, checkUserAuthorization } = require("../../services/authorizationCheck")
const { getAllProducts, saveNewProduct } = require("./productServices")

const storage = multer.diskStorage({
    destination: "public/images/products",
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename)
    }
})

const uploader = multer({ storage: storage })

module.exports = function configProductsApi(app) {

    app.get('/products', checkUserAuthorization, getAllProducts)
    app.post("/products", checkAdminAuthorization, uploader.single("image"), saveNewProduct)

}