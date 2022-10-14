const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ActionRowBuilder,
} = require('discord.js');
const { version } = require('../../../package.json');

module.exports = {
  category: 'General',
  args: '(command)',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View a list of all commands or view in depth information about a single command')
    .addStringOption(o => o.setName('command').setDescription('Input a command name')),
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const b1 = new ButtonBuilder()
      .setCustomId('help-general')
      .setLabel('General')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('help-tools')
      .setLabel('Tools')
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('help-leveling')
      .setLabel('Leveling')
      .setStyle(ButtonStyle.Primary);

    const b4 = new ButtonBuilder()
      .setCustomId('help-economy')
      .setLabel('Economy')
      .setStyle(ButtonStyle.Primary);

    const b5 = new ButtonBuilder()
      .setCustomId('help-admin')
      .setLabel('Administration')
      .setStyle(ButtonStyle.Primary);

    if (!interaction.member.permissions.has([PermissionFlagsBits.Administrator])) b5.setDisabled(true);

    const row = new ActionRowBuilder().setComponents(b1, b2, b3, b4, b5);

    const embed = new EmbedBuilder()
      .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL(true) })
      .setColor(clientMember.displayColor)
      .setFooter({ text: `v${version} | () = Optional - <> = Required - @ = User - # = Channel - @& = Role` })
      .setDescription('Use the buttons below to cycle through all the commands available to you. Please note ' +
        'that some buttons may be disabled for you due to being locked behind permissions. You can dismiss this ' +
        'message at any time to end the command.\n\nThere\'s a legend below that explains what the options are ' +
        'wrapped with. If you have any questions please reach out to the developer or bot support for help.');

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};