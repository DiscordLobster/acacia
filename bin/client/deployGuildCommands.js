const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
require('dotenv').config();

const applicationId = process.env.APPLICATION_ID;
const guildId = process.env.GUILD_ID;

const commandArray = [];

const commandFolders = readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../../src/commands/${folder}/${file}`);
		commandArray.push(command.data.toJSON());
		console.log(`Pushed './src/commands/${folder}/${file}' to an array`);
	}
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

async () => {
    try {
        console.log('Attempting to deploy guild commands...');
        await rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commandArray });
        console.log(`Successfully deployed ${commandArray.length} commands!`);
    }
    catch (err) {
        console.error(err);
    }
};