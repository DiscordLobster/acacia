const package = require('../../../package.json');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        const { commands } = client;
        console.log(`Logged in as ${client.user.tag}!`);

        const choices = [
            { type: ActivityType.Playing, name: `with ${commands.size} commands` },
            { type: ActivityType.Streaming, name: `v${package.version}` },
        ];

        setInterval(() => {
            const choice = choices[Math.floor(Math.random() * choices.length)];
            client.user.setActivity({ type: choice.type, name: choice.name });
        }, 15000);

        const channel = await client.channels.fetch('1037500239092924549');
        if (!channel) return;

        await channel.edit({ name: `Members: ${channel.guild.memberCount}` });
    },
};