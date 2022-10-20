const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-image',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-set-image')
      .setTitle('Set Embed Image');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Image URL')
      .setPlaceholder('Valid image url')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder()
      .setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};