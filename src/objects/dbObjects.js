require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
});

const BotUser = require('../models/userModel')(sequelize, Sequelize.DataTypes);
const BotSettings = require('../models/settingsModel')(sequelize, Sequelize.DataTypes);
const LevelRoles = require('../models/levelRoleModel')(sequelize, Sequelize.DataTypes);
const Questions = require('../models/quizModel')(sequelize, Sequelize.DataTypes);

// Create any associations
//

// Attach any properties
//

module.exports = {
    BotUser,
    BotSettings,
    LevelRoles,
    Questions,
};