const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-color',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-set-color')
      .setTitle('Set Embed Color');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('R')
      .setPlaceholder('0-255')
      .setStyle(TextInputStyle.Short);

    const ti2 = new TextInputBuilder()
      .setCustomId('ti2')
      .setLabel('G')
      .setPlaceholder('0-255')
      .setStyle(TextInputStyle.Short);

    const ti3 = new TextInputBuilder()
      .setCustomId('ti3')
      .setLabel('B')
      .setPlaceholder('0-255')
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder().setComponents(ti1);
    const row2 = new ActionRowBuilder().setComponents(ti2);
    const row3 = new ActionRowBuilder().setComponents(ti3);

    modal.setComponents(row1, row2, row3);

    await interaction.showModal(modal);
  },
};