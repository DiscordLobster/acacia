const { BotSettings } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/settings.log', { flags: 'a' });
const dayjs = require('dayjs');

module.exports = (collection) => {
    Reflect.defineProperty(collection, 'add', {
        value: async (guildId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = collection.get(guildId) || await BotSettings.findOne({ where: { guild_id: guildId } });
            if (settings) return settings;

            await BotSettings.create({ guild_id: guildId });
            settings = await collection._sync(guildId);

            logger.write(`[${dateFormat}] Initialized new settings data for guild: ${guildId}\n`);

            return settings;
        },
    });

    Reflect.defineProperty(collection, 'remove', {
        value: async (guildId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            const settings = collection.get(guildId) || await BotSettings.findOne({ where: { guild_id: guildId } });
            if (!settings) return new Error(`No settings were found for guild id: ${guildId}`);

            await BotSettings.destroy({ where: { guild_id: guildId } });
            collection.delete(guildId);

            logger.write(`[${dateFormat}] Removed settings data for guild\n`);

            return settings;
        },
    });

    Reflect.defineProperty(collection, 'setXpRate', {
        value: async (guildId, min, max) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            await BotSettings.update({
                xp_min: parseInt(min, 10),
                xp_max: parseInt(max, 10),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Set the xp rate from ${settings.xp_min} - ${settings.xp_max} to: ${min} - ${max}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'setMoneyRate', {
        value: async (guildId, min, max) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            await BotSettings.update({
                money_min: parseInt(min, 10),
                money_max: parseInt(max, 10),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Set the money rate from: ${settings.money_min} - ${settings.money_max} to: ${min} - ${max}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'setLvlUpMsg', {
        value: async (guildId, message) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            await BotSettings.update({
                lvl_up_msg: message,
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Changed the level up message from: "${settings.lvl_up_msg}" to: "${message}"\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'setMoneyName', {
        value: async (guildId, input) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            await BotSettings.update({
                currency_name: input,
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Changed the currency name from: ${settings.currency_name} to: ${input}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'addWelcomeChannel', {
        value: async (guildId, channelId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            let channels = settings.welcome_channels;
            if (channels === null) {
                await BotSettings.update({
                    welcome_channels: channelId,
                }, { where: { guild_id: guildId } });

                logger.write(`[${dateFormat}] Added a new welcome channel: ${channelId}\n`);

                return await collection._sync(guildId);
            }
            else {
                channels = channels.split(',');
                channels.push(channelId);
            }

            await BotSettings.update({
                welcome_channels: channels.join(),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Added a new welcome channel: ${channelId}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'removeWelcomeChannel', {
        value: async (guildId, channelId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            let channels = settings.welcome_channels.split(',');
            if (!channels.find(channelId)) return new Error('No channel with this id was found!');
            channels = channels.filter(key => key !== channelId);

            await BotSettings.update({
                welcome_channels: channels.join(),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Removed a welcome channel: ${channelId}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'addIgnoredChannel', {
        value: async (guildId, channelId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            let channels = settings.ignored_channels;
            if (channels === null) {
                await BotSettings.update({
                    ignored_channels: channelId,
                }, { where: { guild_id: guildId } });

                logger.write(`[${dateFormat}] Added a new ignored channel: ${channelId}\n`);

                return await collection._sync(guildId);
            }
            else {
                channels = channels.split(',');
                channels.push(channelId);
            }

            await BotSettings.update({
                ignored_channels: channels.join(),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Added a new ignored channel: ${channelId}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'removeIgnoredChannel', {
        value: async (guildId, channelId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let settings = await collection.fetch(guildId);
            if (!settings) settings = await collection.add(guildId);

            let channels = settings.ignored_channels.split(',');
            if (!channels.find(channelId)) return new Error('No channel with this id was found!');
            channels = channels.filter(key => key !== channelId);

            await BotSettings.update({
                ignored_channels: channels.join(),
            }, { where: { guild_id: guildId } });

            logger.write(`[${dateFormat}] Removed an ignored channel: ${channelId}\n`);

            return await collection._sync(guildId);
        },
    });

    Reflect.defineProperty(collection, 'fetch', {
        value: async (guildId) => {
            const cacheSettings = collection.get(guildId);
            if (cacheSettings) {
                return cacheSettings;
            }
            else {
                const querySettings = await BotSettings.findOne({ where: { guild_id: guildId } });
                if (!querySettings) return false;
                collection.set(guildId, querySettings);

                return querySettings;
            }
        },
    });

    Reflect.defineProperty(collection, '_sync', {
        value: async (guildId) => {
            let settings = await BotSettings.findOne({ where: { guild_id: guildId } });
            if (!settings) settings = await collection.add(guildId);

            collection.set(guildId, settings);

            return settings;
        },
    });
};