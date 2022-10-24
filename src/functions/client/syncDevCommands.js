const { readdirSync } = require('fs');

module.exports = (client) => {
  client.syncDevCommands = () => {
    const { devCommands } = client;

    const devFiles = readdirSync('./src/commands/Developer').filter(file => file.endsWith('.js'));

    for (const file of devFiles) {
      const devCommand = require(`../../commands/Developer/${file}`);
      devCommands.set(devCommand.data.name, devCommand);
    }

    console.log('Synced %d developer commands', devCommands.size);
  };
};