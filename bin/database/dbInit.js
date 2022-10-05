require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: false,
});

require('../../src/models/userModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/settingsModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/levelRoleModel')(sequelize, Sequelize.DataTypes);
require('../../src/models/quizModel')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('force') || process.argv.includes('--f');

sequelize.sync({ force }).then(() => {
    console.log('Initialized data tables');
    sequelize.close();
});