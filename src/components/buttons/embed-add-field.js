const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-add-field',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-add-field-form')
      .setTitle('Add Field');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Title')
      .setPlaceholder('Header of the field')
      .setStyle(TextInputStyle.Short);

    const ti2 = new TextInputBuilder()
      .setCustomId('ti2')
      .setLabel('Text')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Body of the field');

    const row1 = new ActionRowBuilder().setComponents(ti1);
    const row2 = new ActionRowBuilder().setComponents(ti2);

    modal.setComponents(row1, row2);

    await interaction.showModal(modal);
  },
};