const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-add-ignored',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle('Add Ignored Channel')
      .setCustomId('add-ignored-channel-modal');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Channel ID')
      .setPlaceholder('Enter a valid channel id')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().setComponents(ti1);
    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};