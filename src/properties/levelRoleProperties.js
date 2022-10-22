const { LevelRoles } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/leveling.log', { flags: 'a' });

module.exports = (collection) => {
  Reflect.defineProperty(collection, 'add', {
    value: async (guildId, level, roleId) => {
      const cacheLevel = collection.get(level);
      if (cacheLevel) {
        return cacheLevel;
      }
      else {
        const newLevel = await LevelRoles.create({
          level: level,
          guildId: guildId,
          role_id: roleId,
        });
        collection.set(level, newLevel);

        logger.write(`Added a new level role for level: ${level} with the role ID: ${roleId}`);

        return newLevel;
      }
    },
  });

  Reflect.defineProperty(collection, 'fetch', {
    value: async (guildId, level) => {
      const cacheLevel = collection.get(level);
      if (cacheLevel) {
        return cacheLevel;
      }
      else {
        const queryLevel = await LevelRoles.findOne({ where: { guildId: guildId, level: level } });
        if (!queryLevel) return false;
        collection.set(level, queryLevel);

        return queryLevel;
      }
    },
  });

  Reflect.defineProperty(collection, 'fetchAll', {
    value: async () => {
      const queriedLevels = await LevelRoles.findAll({ order: [['level', 'DESC']] });
      if (queriedLevels.length < 1) return false;

      queriedLevels.forEach(key => collection.set(key.level, key));

      console.log('Logged %d level roles to local cache.', collection.size);

      return collection;
    },
  });
};