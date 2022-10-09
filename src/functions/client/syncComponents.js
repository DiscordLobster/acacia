const { readdirSync } = require('fs');

module.exports = (client) => {
  client.syncComponents = () => {
    const { buttons, menus, modals } = client;

    const componentFolders = readdirSync('./src/components');

    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(file => file.endsWith('.js'));

      switch (folder) {
        case 'buttons':
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          }
          console.log(`Synced ${buttons.size} buttons`);
          break;

        case 'menus':
          for (const file of componentFiles) {
            const menu = require(`../../components/${folder}/${file}`);
            menus.set(menu.data.name, menu);
          }
          console.log(`Synced ${menus.size} select menus`);
          break;

        case 'modals':
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
          }
          console.log(`Synced ${modals.size} modals`);
          break;

        default:
          break;
      }
    }
  };
};