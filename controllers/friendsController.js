const {Users} = require("../models/database_controller");

exports.addFriends = async (req, res, next) => {
    if (!req.body || !req.body.friendId || !req.body.userID) {
        return res.status(400).render("partials/errorPages/errorDataForm");
    }
    try {
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
            return res.status(400).render("partials/errorPages/errorFriendAdd");
        }

        friendsArray.push(req.body.friendId);
        user.friends = JSON.stringify(friendsArray); 
        await user.save();

        console.log("Пользователь добавлен в контакты");
        res.redirect('/friend')
    } catch (error) {
        console.error(error);
        return res.status(500).render("partials/errorPages/errorServer");
    }
};
exports.dellFriends = async (req, res, next) => {
    try {
        const user = await Users.findOne({ where: { email: req.session.userEmail } });
        const friend = await Users.findOne({ where: { id: req.body.friendId } });
        
        if (!friend) {
            return res.status(400).send("Пользователь не найден");
        }

        const friendsID = user.friends;
        let friendsIDs = JSON.parse(friendsID);

        friendsIDs.splice(friendsIDs.indexOf(req.body.friendId), 1);
        
        user.friends = JSON.stringify(friendsIDs);

        await user.save();

        console.log("Пользователь удален из контактов");
        res.redirect('/friend')
    } catch (error) {
        console.error(error);
        return res.status(500).render("partials/errorPages/errorServer");
    }
};

