const { EmbedBuilder } = require('discord.js');
const { randnum } = require('../../utilities/randnum');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const { localUsers, botSettings, levelRoles, devCommands } = client;

        if (message.author.id === process.env.DEV_ID) {
            const devCommand = devCommands.get(message.content);
            if (devCommand) {
                try {
                    await devCommand.execute(message, client);
                }
                catch (err) {
                    console.error(err);
                }
            }
        }

        let settings = await botSettings.fetch(message.channel.guild.id);
        if (!settings) settings = await botSettings.add(message.channel.guild.id);
        const randomXp = randnum(settings.xp_min, settings.xp_max);
        const xpGive = randnum(1, 10);

        let ignoredChannels = settings.ignored_channels;
        try {
            ignoredChannels = ignoredChannels.split(',');
        }
        catch (err) {
            console.error(err);
        }

        if (ignoredChannels.some(key => key === message.channel.id)) return;

        if (xpGive > 2 && xpGive < 7) {
            let user = await localUsers.addXp(message.author.id, randomXp);

            if (localUsers.hasLeveledUp(user.xp, user.level)) {
                user = await localUsers.incrementLevel(message.author.id);

                const embed = new EmbedBuilder()
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL(true) })
                    .setColor(message.member.displayColor)
                    .setDescription(`${settings.lvl_up_msg.replace('%l', user.level)}`)
                    .setFooter({ text: `${localUsers.xpRequired(user.xp, user.level)} xp required for the next level` });

                await message.reply({ content: `${message.author}`, embeds: [embed] });

                const giveLevelRole = await levelRoles.fetch(message.guild.id, user.level);
                if (giveLevelRole) {
                    try {
                        const role = await message.guild.roles.fetch(giveLevelRole.role_id);
                        if (!role) return;
                        await message.member.roles.add(role, 'Level Role');
                    }
                    catch {
                        return;
                    }
                }
                else if (!giveLevelRole) {
                    return;
                }
            }
        }

        const moneyGive = randnum(1, 10);
        const randomMoney = randnum(settings.money_min, settings.money_max);

        if (moneyGive > 2 && moneyGive < 7) {
            await localUsers.addWallet(message.author.id, randomMoney);
        }
    },
};