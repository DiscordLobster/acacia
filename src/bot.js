const { readdirSync } = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

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

client.localUsers = new Collection();
client.settings = new Collection();

// Attach properties to the collections
//

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
client.handleEvents();
client.login(process.env.BOT_TOKEN);

async () => {
	await client.settings.syncAll();
};