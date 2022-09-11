require("dotenv").config()
const crypto = require("crypto")

let usersMem = []

async function saveUser(userObject) {
    const existentUser = usersMem.find(user => user.username === userObject.username)
    if (existentUser) {
        throw new Error("username is in use")
    } else {
        userObject.id = crypto.randomUUID()
        usersMem.push (userObject)
        return (newUser._id)
    }

}

async function getUsername(username) {
    const existentUser = usersMem.find(user => user.username === username)
    if (!existentUser) return (null)
    return (existentUser)
}


module.exports = usersDAO = { getUsername, saveUser }