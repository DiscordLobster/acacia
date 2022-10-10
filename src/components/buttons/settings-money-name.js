const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-money-name',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('set-money-name-modal')
      .setTitle('Set Currency Name');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Currency Name')
      .setMinLength(1)
      .setMaxLength(255)
      .setPlaceholder('Input a currency name')
      .setStyle(TextInputStyle.Short);

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};