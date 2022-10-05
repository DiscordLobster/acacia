const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const { version } = require('../../../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName('settings')
    .setDescription('View and/or change various bot settings'),
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const b1 = new ButtonBuilder()
      .setCustomId('settings-channels')
      .setLabel('Channels')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('settings-leveling')
      .setLabel('Leveling')
      .setDisabled(true)
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('settings-economy')
      .setLabel('Economy')
      .setDisabled(true)
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().setComponents(b1, b2, b3);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.member.displayAvatarURL(true) })
      .setColor(clientMember.displayColor)
      .setFooter({ text: `v${version}` })
      .setDescription('You can use the buttons below to view or change various settings for the bot! ' +
        'If you have any questions please don\'t hesitate to reach out to the Developer for support! ' +
        'You can dismiss this message at any time to stop changing settings. Please make sure to read ' +
        'every direction in order to avoid making mistakes or errors!');

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};