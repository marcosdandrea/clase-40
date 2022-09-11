const { Server } = require("socket.io");
const messagesServices = require("./messagesServices")

module.exports = function configMessagesAPI(server) {

    const io = new Server(server);

    io.on('connection', async (socket) => {
        try {
            console.log('> cliente de chat conectado: ' + socket.id);
            await messagesServices.sendAllMessages(socket);

            socket.on("newMessage", async (message) => {
                await messagesServices.saveMessage(message)
                await messagesServices.sendAllMessages(io);
            })

        } catch (err) {
            logger.logError("error", err)
        }

    });


}
