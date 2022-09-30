const { BotUser } = require('../objects/dbObjects');
const dayjs = require('dayjs');
const { createWriteStream } = require('fs');
const userLogger = createWriteStream('./src/logs/users.log', { flags: 'a' });


/**
 * User properties for the 'client.localUsers' collection
 */
module.exports = (collection) => {

    /**
     * 'client.localUsers.add(userId)'
     *
     * Adds a new user query to the database and collection and returns the created data
     * Similarily, if the collection is above the user cache limit it'll sweep data from the cache that matches
     * the inputted argument
     */
    Reflect.defineProperty(collection, 'add', {
        value: async (userId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            const check = collection.fetch(userId);
            if (check) return check;

            const newUser = await BotUser.create({
                user_id: userId,
            });
            collection.set(userId, newUser);
            userLogger.write(`[${dateFormat}] Created user data for ${userId}\n`);
            if (collection.size > process.env.USER_CACHE_LIMIT) collection.clean(6);

            return newUser;
        },
    });

    /**
     * 'client.localUsers.remove(userId)'
     *
     * Removes a user query from the database and collection and returns the data before it was removed
     */
    Reflect.defineProperty(collection, 'remove', {
        value: async (userId) => {
            const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
            const check = collection.fetch(userId) || await BotUser.findOne({ where: { user_id: userId } });
            if (!check) return new Error('No user was found!');

            await BotUser.destroy({ where: { user_id: userId } });

            userLogger.write(`[${dateFormat}] Deleted user data for ${userId}`);

            return check;
        },
    });

    /**
     * 'client.localUsers.fetch(userId)'
     *
     * Fetches a user's data from the cache or queries a result from the database if it doesn't exist in cache
     */
    Reflect.defineProperty(collection, 'fetch', {
        value: async (userId) => {
            const user = collection.get(userId) || await BotUser.findOne({ where: { user_id: userId } });
            if (!user) return false;

            return user;
        },
    });

    /**
     * 'client.localUsers.fetchAll()'
     *
     * TBA
     */
    Reflect.defineProperty(collection, 'fetchAll', {
        value: async () => {
            const queryUsers = await BotUser.findAll();
            if (collection.size !== queryUsers.length) {
                collection.clear();
                queryUsers.forEach(key => collection.set(key.user_id, key));

                return queryUsers;
            }

            return collection;
        },
    });

    /**
     * 'client.localUsers._sync(userId)'
     *
     * Sync a database query to the collection
     */
    Reflect.defineProperty(collection, '_sync', {
        value: async (userId) => {
            const user = await BotUser.findOne({ where: { user_id: userId } });
            if (!user) return new Error('No user was found!');
            collection.set(userId, user);

            if (collection.size > process.env.USER_CACHE_LIMIT) collection.clean(6);

            return user;
        },
    });

    /**
     * 'client.localUsers.clean(hours)'
     *
     * Sweeps the collection of any results that haven't been updated since (hours) have passed
     */
    Reflect.defineProperty(collection, 'clean', {
        value: (hours) => {
            return collection.sweep(key => {
                dayjs(key.updatedAt).add(hours, 'hours') < Date.now();
            });
        },
    });
};