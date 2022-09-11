const sendMail = require("../../services/notifications/NodeMailer")

function registerUser(req, res, next) {
    const mailOptions = {
        from: "Servidor Backend",
        to: process.env.NOTIFICATION_EMAIL,
        subject: "Nuevo registro",
        html: "El usuario " + req?.body.fullname + " se ha registrado con el mail " + req?.body.username
    }
    sendMail(mailOptions)
    res?.send({ msg: "Usuario registrado con éxito", redirect: "/panel" })
}

function loginUser(req, res, next) {
    const cookieContent = {
        alias: req.user.alias,
        username: req.user.username,
        profilePic: req.user.profilePic,
        telephone: req.user.telephone
    }

    if (req.user.level == "admin"){
        res.cookie("user", JSON.stringify(cookieContent))
        res.status(200).redirect("/panel")
        console.log("> Administrador logueado:", req.user.username)
    }else{
        res.cookie("user", JSON.stringify(cookieContent))
        res.status(200).redirect("/carrito")
        console.log("> Usuario logueado:", req.user.username)
    }
}

function logoutUser(req, res, next) {
    if (req.user) {
        console.log("Cerrando sesion")
        req.logout(function (err) {
            if (err) return next(err);
            res.redirect("/")
        });
    } else {
        res.redirect("/")
    }
}

module.exports = userServices = {registerUser, loginUser, logoutUser}