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

            await BotUser.increment(['xp'], { by: amount, where: { user_id: userId } });
            user = await collection._sync(userId);

            logger.write(`[${dateFormat}] Added ${amount} xp to: ${userId}`);

            return user;
        },
    });

    Reflect.defineProperty(collection, 'xpForLevel', {
        value: (level) => {
            const basis = 30;
            const extra = 20;
            const acc_a = 30;
            const acc_b = 30;

            return Math.round(
                (basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) /
                (6 + Math.pow(level, 2) / 50 / acc_b) +
                (level - 1) * extra,
            );
        },
    });

    Reflect.defineProperty(collection, 'xpRequired', {
        value: (currentXp, currentLevel) => {
            const xpForNextLevel = collection.xpForLevel(currentLevel + 1);
            const xpRequired = xpForNextLevel - currentXp;

            return xpRequired;
        },
    });

    Reflect.defineProperty(collection, 'cleanXp', {
        value: (currentXp, currentLevel) => {
            const xpForNextLevel = collection.xpForLevel(currentLevel + 1);
            const xpRequired = xpForNextLevel - currentXp;
            const cleanXp = currentXp - xpRequired;

            return cleanXp;
        },
    });

    Reflect.defineProperty(collection, 'hasLeveledUp', {
        value: (currentXp, currentLevel) => {
            if (currentXp >= collection.xpForLevel(currentLevel + 1)) return true;
            else return false;
        },
    });
};