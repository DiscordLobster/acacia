const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-description',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-set-description')
      .setTitle('Set Description');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};