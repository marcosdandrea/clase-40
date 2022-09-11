const Logger = require("../../services/Logger")
const logger = new Logger()
const messagesDB = require("./messagesORM")
const NormalizeMsg = require("../../scripts/NormalizeMsg")
const normalize = new NormalizeMsg()

async function sendAllMessages(socket){
    try{
        const allMessages = await messagesDB.getAllMessages()
        const allMessageMapped = allMessages.map(msg =>
            ({
                id: msg._id,
                author: JSON.parse(msg.author),
                text: JSON.parse(msg.text)
            })
        )
        const normalizedMsgs = normalize.normalize(allMessageMapped)
        socket.emit("newMessages", JSON.stringify(normalizedMsgs))   
    }catch(err) {
        logger.logError("error", err)
    }  
}

async function saveMessage(message){
    await messagesDB.save(message)
}

module.exports = {saveMessage, sendAllMessages}