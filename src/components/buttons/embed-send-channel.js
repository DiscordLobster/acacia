const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-send-channel',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-send-channel-modal')
      .setTitle('Embed Send Channel');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Channel')
      .setPlaceholder('Channel ID')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};