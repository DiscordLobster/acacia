const { EmbedBuilder } = require('discord.js');
const { randnum } = require('../../utilities/randnum');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const { localUsers, botSettings } = client;

        const settings = await botSettings.fetch(message.channel.guild.id);
        const randomXp = randnum(settings.xp_min, settings.xp_max);
        const xpGive = randnum(1, 10);

        if (xpGive > 3 && xpGive < 7) {
            const hasLeveledUp = await localUsers.addXp(message.author.id, randomXp);
            const user = await localUsers.fetch(message.author.id);

            if (hasLeveledUp) {
                const embed = new EmbedBuilder()
                    .setColor(message.member.displayColor)
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL(true) })
                    .setDescription(`${settings.lvl_up_msg.replace('%l', user.level)}`);

                await message.reply({ content: `${message.author}`, embeds: [embed] });
            }
        }

        const randomMoney = randnum(settings.money_min, settings.money_max);
        const moneyGive = randnum(1, 10);

        if (moneyGive > 3 && xpGive < 7) {
            await localUsers.addWallet(message.author.id, randomMoney);
        }
    },
};