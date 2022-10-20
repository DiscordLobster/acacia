const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-footer',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-set-footer')
      .setTitle('Embed Set Footer');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Footer')
      .setMinLength(1)
      .setMaxLength(2048)
      .setPlaceholder('2048 max')
      .setStyle(TextInputStyle.Paragraph);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};