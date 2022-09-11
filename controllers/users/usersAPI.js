const passport = require("../../security/passport")
const multer = require("multer");
const userServices = require("./usersServices")
const cookieParser = require("cookie-parser")

const storage = multer.diskStorage({
    destination: "public/images/profiles",
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename)
    }
})

const uploadMedia = multer({ storage: storage })

function configUsersAPI(app){
    
        app.use(cookieParser())

        app.post("/auth/register",
            uploadMedia.single("profilePic"),  
            passport.authenticate("registration", { session: true }),       
            userServices.registerUser
        )

        app.post("/auth/login",
            passport.authenticate("login", { session: true }), 
            userServices.loginUser
        );

        app.post('/auth/logout',
            userServices.logoutUser
        );
}

module.exports = configUsersAPI