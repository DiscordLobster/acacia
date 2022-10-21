const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  category: 'Leveling',
  args: '(@user)',
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('View your or another user\'s level')
    .addUserOption(o => o.setName('user').setDescription('Select a user')),
  async execute(interaction, client) {
    const user = interaction.options.getMember('user') || interaction.member;
    if (user.user.bot) return interaction.reply({ embeds: [client.embeds.errEmbed('I can\'t interact with other bots!')], ephemeral: true });

    const lvlUser = await client.localUsers.fetch(user.id);
    if (!lvlUser) return interaction.reply({ embeds: [client.embeds.errEmbed('This user does not have any data!')], ephemeral: true });

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.user.tag, iconURL: user.displayAvatarURL(true) })
      .setColor(user.displayColor)
      .setDescription(`**Current Level:** ${lvlUser.level}\n**Total XP:** ${lvlUser.xp}`)
      .setFooter({ text: `${client.localUsers.xpRequired(lvlUser.xp, lvlUser.level)} xp required for next level` });

    await interaction.reply({ embeds: [embed], fetchReply: true })
      .then(msg => setTimeout(() => msg.delete(), 10000))
      .catch(err => console.error(err));
  },
};