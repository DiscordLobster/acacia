require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

class Embed {
    static async errEmbed(message, client) {
        const developer = await client.users.fetch(process.env.DEV_ID);
        const embed = new EmbedBuilder()
            .setColor([202, 24, 13])
            .setDescription(`**ERROR**\n\n${message}`)
            .setFooter({ text: `Please contact ${developer.tag} if you have any questions or concerns!`, iconURL: developer.displayAvatarURL(true) });

        return embed;
    }
}

module.exports = Embed;