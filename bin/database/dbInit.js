require('dotenv').config();
const { readdirSync } = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
});

const modelFiles = readdirSync('./src/models').filter(file => file.endsWith('.js'));

for (const file of modelFiles) {
    require(`../../src/models/${file}`);
}

const force = process.argv.includes('force') || process.argv.includes('--f');

sequelize.sync({ force }).then(() => {
    console.log('Initialized data tables');
    sequelize.close();
});