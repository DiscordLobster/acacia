const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'Economy',
  args: '(@user)',
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('View your or another user\'s balance')
    .addUserOption(o => o.setName('user').setDescription('Select a user')),
  async execute(interaction, client) {
    const user = interaction.options.getMember('user') || interaction.member;
    if (user.user.bot) return interaction.reply({ embeds: [client.embeds.errEmbed('I can not interact with bot users!')], ephemeral: true });

    const { localUsers, botSettings } = client;

    const settings = await botSettings.fetch(interaction.guild.id);

    const localUser = await localUsers.fetch(user.id);
    if (!localUser) return interaction.reply({ embeds: [client.embeds.errEmbed('No data was found for this user!')], ephemeral: true });

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.user.tag, iconURL: user.displayAvatarURL(true) })
      .setColor(user.displayColor)
      .setDescription(`**Wallet:** ${localUser.wallet} ${settings.currency_name}\n**Bank:** ${localUser.bank} ${settings.currency_name}`)
      .setFooter({ text: `${localUser.total} total` });

    await interaction.reply({ embeds: [embed], fetchReply: true })
      .then(msg => setTimeout(() => msg.delete(), 10000))
      .catch(err => console.error(err));
  },
};