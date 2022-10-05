const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-remove-ignored',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle('Remove Ignored Channel')
      .setCustomId('remove-ignored-channel-modal');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Channel ID')
      .setPlaceholder('Please enter a valid channel ID')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};