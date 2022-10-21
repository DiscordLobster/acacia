const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-add-lvl-role',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('add-level-role')
      .setTitle('Add Level Role');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Level')
      .setPlaceholder('Input valid number')
      .setStyle(TextInputStyle.Short);

    const ti2 = new TextInputBuilder()
      .setCustomId('ti2')
      .setLabel('Role ID')
      .setPlaceholder('Input valid role ID')
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder().setComponents(ti1);
    const row2 = new ActionRowBuilder().setComponents(ti2);

    modal.setComponents(row1, row2);

    await interaction.showModal(modal);
  },
};