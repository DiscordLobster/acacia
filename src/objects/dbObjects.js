require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
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