require("dotenv").config()
const mongoose = require("mongoose")
const message = require("../../database/models/messageModel")

async function saveMessage(messageObject) {
    await mongoose.connect(process.env.MONGO_URL)
    const newMesssage = new message(messageObject)
    await newMesssage.save()
    mongoose.disconnect();
    return (newMesssage._id)
}

async function getAllMessages() {
    await mongoose.connect(process.env.MONGO_URL)
    const allMessage = await message.find({}, { '__v': 0 })
    return (allMessage)
}


module.exports = messagesDB = { saveMessage, getAllMessages }