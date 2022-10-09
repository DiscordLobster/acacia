require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

class Embed {
    static errEmbed(message) {
        const embed = new EmbedBuilder()
            .setColor([202, 24, 13])
            .setDescription(`**ERROR**\n\n${message}`)
            .setFooter({ text: 'Please contact the Developer if you have any questions or concerns!' });

        return embed;
    }
}

module.exports = Embed;