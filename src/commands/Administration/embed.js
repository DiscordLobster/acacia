const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName('embed')
    .setDescription('Create an embed to send to a channel'),
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const b1 = new ButtonBuilder()
      .setCustomId('embed-title')
      .setLabel('Title')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('embed-color')
      .setLabel('Color')
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('embed-description')
      .setLabel('Description')
      .setStyle(ButtonStyle.Primary);

    const b4 = new ButtonBuilder()
      .setCustomId('embed-footer')
      .setLabel('Footer')
      .setStyle(ButtonStyle.Primary);

    const b5 = new ButtonBuilder()
      .setCustomId('embed-image')
      .setLabel('Image')
      .setStyle(ButtonStyle.Primary);

    const b6 = new ButtonBuilder()
      .setCustomId('embed-send-current')
      .setLabel('Send In Current Channel')
      .setStyle(ButtonStyle.Success);

    const b7 = new ButtonBuilder()
      .setCustomId('embed-send-channel')
      .setLabel('Send In Different Channel')
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder()
      .setComponents(b1, b2, b3, b4, b5);

    const row2 = new ActionRowBuilder()
      .setComponents(b6, b7);

    const embed = new EmbedBuilder()
      .setColor(clientMember.displayColor)
      .setDescription('This is a test description! It can\'t exceed more than 4096 characters in length!\n\nWhen you\'re setting the color of the embed please use RGB tuples (255, 255, 255) as the input!\n\nWhen you set an image make sure it\'s a valid image link (.png, .gif, .webp, .jpg)\n\nAny fields you did not set (Like the footer or title) won\'t be reflected in the finished product.')
      .setTitle('This is a test title!')
      .setFooter({ text: 'This is a test footer! It can\'t exceed more than 2048 characters in length! I will disappear when you edit or send me in a channel!' });

    await interaction.reply({ embeds: [embed], components: [row1, row2], ephemeral: true });
  },
};