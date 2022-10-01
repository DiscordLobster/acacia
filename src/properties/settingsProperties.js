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

            logger.write(`[${dateFormat}] Removed settings data for guild: ${guildId}\n`);

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
            }, { where: { guild_id: guildId } }).save();

            logger.write(`[${dateFormat}] Set the xp rate for ${guildId} to ${min} - ${max}\n`);

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
            }, { where: { guild_id: guildId } }).save();

            logger.write(`[${dateFormat}] Set the money rate for ${guildId} to ${min} - ${max}`);

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
            }, { where: { guild_id: guildId } }).save();

            logger.write(`[${dateFormat}] Changed the level up message for ${guildId} from: "${settings.lvl_up_msg}" to: "${message}"`);

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