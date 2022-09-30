const { BotUser } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/leveling.log', { flags: 'a' });
const dayjs = require('dayjs');

module.exports = (collection) => {
    Reflect.defineProperty(collection, 'addXp', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                xp: parseInt(amount, 10) + user.xp,
                level: Math.floor(0.15 * Math.pow(amount + user.xp, 1 / 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Added ${amount} xp to user: ${userId}\n`);

            const newUser = await collection._sync(userId);

            return (Math.floor(0.15 * Math.pow(newUser.xp -= amount, 1 / 2.4)) > newUser.level);
        },
    });

    Reflect.defineProperty(collection, 'setXp', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                xp: parseInt(amount, 10),
                level: Math.floor(0.15 * Math.pow(amount, 1 / 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Set xp for ${userId} to ${amount}\n`);

            const newUser = await collection._sync(userId);

            return newUser;
        },
    });

    Reflect.defineProperty(collection, 'removeXp', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                xp: user.xp - parseInt(amount, 10),
                level: Math.floor(0.15 * Math.pow(user.xp - amount, 1 / 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Removed ${amount} xp from user: ${userId}\n`);

            const newUser = await collection._sync(userId);

            return newUser;
        },
    });

    Reflect.defineProperty(collection, 'addLevels', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                level: user.level + parseInt(amount, 10),
                xp: Math.ceil(Math.pow((user.level + amount) * 0.15, 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Added ${amount} level(s) to user: ${userId}`);

            const newUser = await collection._sync(userId);

            return newUser;
        },
    });

    Reflect.defineProperty(collection, 'setLevel', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                level: parseInt(amount, 10),
                xp: Math.ceil(Math.pow(amount * 0.15, 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Set the level for ${userId} to ${amount}`);

            const newUser = await collection._sync(userId);

            return newUser;
        },
    });

    Reflect.defineProperty(collection, 'removeLevels', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                level: user.level - parseInt(amount, 10),
                xp: Math.ceil(Math.pow((user.level - amount) * 0.15, 2.4)),
            }, { where: { user_id: userId } }).save();

            logger.write(`[${dateFormat}] Removed ${amount} level(s) from user: ${userId}`);

            const newUser = await collection._sync(userId);

            return newUser;
        },
    });
};