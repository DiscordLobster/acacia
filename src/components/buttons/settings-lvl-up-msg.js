const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-lvl-up-msg',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('set-lvl-up-msg-modal')
      .setTitle('Set Level Up Message');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Message')
      .setPlaceholder('Input level up message')
      .setStyle(TextInputStyle.Paragraph);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};