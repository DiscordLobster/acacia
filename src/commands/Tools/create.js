const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  SlashCommandBuilder,
} = require('discord.js');
const package = require('../../../package.json');

module.exports = {
  category: 'Tools',
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a profile with the bot'),
  async execute(interaction, client) {
    // eslint-disable-next-line no-unused-vars
    const { buttons, localUsers } = client;

    const b1 = new ButtonBuilder()
      .setCustomId('create-agree')
      .setLabel('Agree & Create')
      .setStyle(ButtonStyle.Success)
      .setDisabled(true);

    const b2 = new ButtonBuilder()
      .setCustomId('create-disagree')
      .setLabel('Disagree')
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);

    const row = new ActionRowBuilder().setComponents(b1, b2);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL(true) })
      .setColor(interaction.member.displayColor)
      .setTitle('Creation Agreement')
      .setDescription(`Hey there, ${interaction.member.nickname || interaction.user.username}!\n\nI see you're interested in creating a profile ` +
        'with me! I\'m excited to help you get started, but first there are some things I\'d like to tell you before you start! Please read ' +
        'the information provided below and make your decision using the buttons attached to this message!')
      .addFields(
        { name: 'Agreement', value: `${interaction.member.nickname || interaction.user.username}, by clicking \`Agree & Create\` below you ` +
        'authorize the bot (Acacia) to store information like your user ID, username and account/server creation dates in order to create ' +
        'a user profile for you.\n\nYou hereby agree that your user profile can be revoked, deleted or changed at any time within reasonable ' +
        'measures and reasons. The Developer (SmirkLobster) reserves the right to utilize this data and information for testing and ' +
        'improvement to the bot itself to provide better user experience.\n\nYou may opt out of these services at any time by creating a help ' +
        'ticket within the server or contacting a member of management.', inline: false },
        { name: 'Additional Information', value: 'User data is automatically deleted after 30 days of inactivity to help clear out the cache ' +
        'and preserve storage space. User data may also be rolled back, deleted, or altered whether planned or unplanned. If planned, an ' +
        'announcement will be put out with plenty of notice prior to the event.\n\nUnplanned events are always a pain, but there are backup ' +
        'services in play and the Developer can always return what was lost if provided with sufficient enough evidence.', inline: false },
        { name: 'Features', value: 'I come with a wide variety of activities and functions to help create an authentic and fun environment ' +
        'for yourself and other users alike.\n\nA leveling system with a hand-crafted experience formula has been implemented as a way for ' +
        'users to gain experience points while they chat with each other! There will be other ways to gain experience in the future. Stay ' +
        'tuned in at <#1024786218581491732> to keep up with the latest changes!\n\nEarning money works the same way! All you have to do is talk ' +
        'to receive my wonderful crystal coins <:f8_crystalcoin_NF2U:1030251437541822555>! There\'s a myriad of games and ways to earn more ' +
        'coins! You can find more information [here](example.com)', inline: false },
      )
      .setFooter({ text: `v${package.version}` });

      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};