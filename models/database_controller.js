const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: './database/database.db'
})

const Users =  sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usersurname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    age:{
        type: Sequelize.DATE,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    about: {
        type: Sequelize.STRING,
        allowNull: true
    },
    friends: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
{
    timestamps: false
});
const Message = sequelize.define("message",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    sender:{
        type: Sequelize.STRING,
        allowNull: false
    },
    recipient:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    messagetext: {
      type: Sequelize.STRING,
      allowNull: false  
    }
},
{
    timestamps: false
});
module.exports = {Users, Message, sequelize};