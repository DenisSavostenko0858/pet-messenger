const {Users} = require("../models/database_controller");

exports.addFriends = async (req, res, next) => {
    if (!req.body || !req.body.friendId || !req.body.userID) {
        return res.status(400).send("Данные не передаются");
    }
    try {
        const idFriend = req.body.friendId;
        const user = await Users.findOne({ where: { id: req.body.userID } });
        const friend = await Users.findOne({ where: { id: req.body.friendId } });
        if (!friend) {
            return res.status(400).send("Пользователь не найден");
        }
        // В случае если нет массива
        if (!user.friends) {
            user.friends = "[]"; 
        }
        let friendsArray;
        try {
            friendsArray = JSON.parse(user.friends);
        } catch (error) {
            return res.status(400).send("Ошибка формата данных в поле friends");
        }
        
        if (friendsArray.includes(req.body.friendId)) {
            return res.status(400).send("Пользователь уже добавлен в контакты");
        }

        friendsArray.push(req.body.friendId);
        user.friends = JSON.stringify(friendsArray); 
        await user.save();

        console.log("Пользователь добавлен в контакты");
        res.redirect('/friend')
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");
    }
};

