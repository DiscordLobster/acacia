const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-money-rate',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('set-money-rate-modal')
      .setTitle('Set Money Rate');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Min')
      .setPlaceholder('Less than max')
      .setStyle(TextInputStyle.Short);

    const ti2 = new TextInputBuilder()
      .setCustomId('ti2')
      .setLabel('Max')
      .setPlaceholder('More than min')
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder().setComponents(ti1);
    const row2 = new ActionRowBuilder().setComponents(ti2);

    modal.setComponents(row1, row2);

    await interaction.showModal(modal);
  },
};