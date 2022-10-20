const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-title',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-set-title')
      .setTitle('Set Embed Title');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Title')
      .setMinLength(1)
      .setMaxLength(256)
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};