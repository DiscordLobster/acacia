const { LevelRoles } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/leveling.log', { flags: 'a' });

module.exports = (collection) => {
  Reflect.defineProperty(collection, 'fetch', {
    value: async (guildId, level) => {
      const cacheLevel = collection.get(level);
      if (cacheLevel) {
        return cacheLevel;
      }
      else {
        const queryLevel = await LevelRoles.findOne({ where: { guild_id: guildId, level: level } });
        if (!queryLevel) return false;
        collection.set(level, queryLevel);

        return queryLevel;
      }
    },
  });
};