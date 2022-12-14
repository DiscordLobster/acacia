const { readdirSync } = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const Embeds = require('./utilities/Embeds');
const Constants = require('./utilities/Constants');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Initiate new DiscordJS Collections for local cache
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();
client.devCommands = new Collection();

client.localUsers = new Collection();
client.botSettings = new Collection();
client.questions = new Collection();
client.levelRoles = new Collection();

client.embedCache = new Collection();

client.embeds = Embeds;
client.constants = Constants;

// Attach properties to the collections
require('./properties/userProperties')(client.localUsers);
require('./properties/userLevelProperties')(client.localUsers);
require('./properties/userEconomyProperties')(client.localUsers);

require('./properties/settingsProperties')(client.botSettings);

require('./properties/questionProperties')(client.questions);

require('./properties/levelRoleProperties')(client.levelRoles);

// Switch case and readdirSync for client functions
const functionFolders = readdirSync('./src/functions');

for (const folder of functionFolders) {
	const functionFiles = readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

	switch (folder) {
	case 'client':
		for (const file of functionFiles) {
			require(`./functions/${folder}/${file}`)(client);
		}
		break;

	default:
		break;
	}
}

client.syncCommands();
client.syncDevCommands();
client.syncComponents();
client.handleEvents();
client.login(process.env.BOT_TOKEN);

async () => {
	await client.settings.syncAll();
	await client.questions.syncAll();
};