const { BotUser } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/economy.log', { flags: 'a' });
const dayjs = require('dayjs');

module.exports = (collection) => {
    Reflect.defineProperty(collection, 'addWallet', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.increment(['wallet', 'total'], { by: amount, where: { user_id: userId } });
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Added ${amount} to the wallet of: ${userId}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'setWallet', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                wallet: parseInt(amount, 10),
                total: user.bank + parseInt(amount, 10),
            }, { where: { user_id: userId } }).save();
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Set user: ${userId}'s wallet to: ${amount}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'removeWallet', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.decrement(['wallet', 'total'], { by: amount, where: { user_id: userId } });
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Removed ${amount} money from the wallet of: ${userId}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'addBank', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.increment(['bank', 'total'], { by: amount, where: { user_id: userId } });
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Added ${amount} money to the bank of: ${userId}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'setBank', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.update({
                bank: parseInt(amount, 10),
                total: user.wallet + parseInt(amount, 10),
            }, { where: { user_id: userId } }).save();
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Set the bank of: ${userId} to ${amount}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'removeBank', {
        value: async (userId, amount) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            let user = await collection.fetch(userId);
            if (!user) user = await collection.add(userId);

            await BotUser.decrement(['bank', 'total'], { by: amount, where: { user_id: userId } });
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Removed ${amount} money from the bank of: ${userId}`);

            return user;
        },
    });
};