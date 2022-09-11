require("dotenv").config()
const fs = require("fs").promises
const crypto = require("crypto")

const filename = "usersDatabaseFs.json"


async function saveUser(userObject) {
    console.log("Saving user")
    try{
        await fs.access(filename)
        .catch(async (err) => {
            if (err.code !== "ENOENT") throw new Error("Can't access users database")
            await fs.writeFile(filename, JSON.stringify([]))
        })

        const dbFilesystem = await fs.readFile(filename, 'UTF-8')
        const dbParsed = JSON.parse(dbFilesystem)
        userObject.id = crypto.randomUUID()
        dbParsed.push(userObject)
        await fs.writeFile(filename, JSON.stringify(dbParsed))
        return (userObject.id)
    }catch(err){
        throw new Error("Can't access users database")
    }
}

async function getUsername(username) {
    try {
        const dbFilesystem = await fs.readFile(filename, 'UTF-8')
        const dbParsed = JSON.parse(dbFilesystem)
        const user = dbParsed.find(user => user.username == username)
        if (!user) return (null)
        return (user)
    } catch (err) {
        if (err.code === "ENOENT") return ([])
    }
}


module.exports = usersDAO = { getUsername, saveUser }