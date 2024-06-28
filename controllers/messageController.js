const {Message} = require("../models/database_controller");

exports.addMessage = async (req, res, next) => {
    if (!req.body || !req.body.recipientEmail || !req.body.userEmail || !req.body.message) {
        return res.status(400).send("Сообщене не отправлено");
    }
    try {
        const dateMessage = new Date();

        const newMessage = await Message.create({
            sender: req.body.userEmail,
            recipient: req.body.recipientEmail,
            messagetext: req.body.message,
            date: dateMessage
          });

        req.session.contactEmail = req.body.recipientEmail;
        res.redirect('/message')
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
    }
};
exports.dellMessage = async (req, res, next) => {
    try {
        if (!req.body || !req.body.messageID) {
            return res.status(400).send("Сообщене не найдено");
        }
        const messageID = req.body.messageID;

        await Message.destroy({ where: { id: messageID } });
        console.log("Сообщение удалено");

        req.session.contactEmail = req.body.contactEmail;
        res.redirect('/message')
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
    }
};
exports.editMessage = async (req, res, next) => {
    try {
        if (!req.body || !req.body.messageID || !req.body.messageText) {
            return res.status(400).send("Сообщене не было передано");
        }
        const messageID = req.body.messageID;
        const messageText = req.body.messageText;

        const fearchMessageID = await Message.findOne({ where: { id: messageID } });
        
        if (!fearchMessageID) {
            return res.status(404).send("Сообщене не найдено");
        }

        fearchMessageID.messagetext = messageText;
        await fearchMessageID.save();

        console.log("Сообщение изменено");

        req.session.contactEmail = req.body.contactEmail;
        res.redirect('/message')
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
    }
};
