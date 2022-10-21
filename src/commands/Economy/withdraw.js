const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'Economy',
  args: '<amount>',
  data: new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Withdraw money from your bank to your wallet')
    .addNumberOption(o => o.setName('amount').setDescription('Input a valid number').setRequired(true)),
  async execute(interaction, client) {
    let amount = interaction.options.getNumber('amount');

    const { localUsers, botSettings } = client;

    const settings = await botSettings.fetch(interaction.guild.id);

    let localUser = await localUsers.fetch(interaction.member.id);
    if (!localUser) return interaction.reply({ embeds: [client.embeds.errEmbed('No data was found for this user!')], ephemeral: true });

    if (amount > localUser.bank) amount = localUser.bank;

    if (localUser.bank < 1) return interaction.reply({ embeds: [client.embeds.errEmbed('You don\'t have any money in your bank!')], ephemeral: true });

    localUser = await localUsers.removeBank(interaction.user.id, amount);
    localUser = await localUsers.addWallet(interaction.user.id, amount);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.member.displayAvatarURL(true) })
      .setColor(interaction.member.displayColor)
      .setDescription(`Successfully withdrew ${amount} ${settings.currency_name} from your bank!\n\n**Wallet:** ${localUser.wallet} ${settings.currency_name}\n**Bank:** ${localUser.bank} ${settings.currency_name}`)
      .setFooter({ text: `${localUser.total} total` });

      await interaction.reply({ embeds: [embed], fetchReply: true })
      .then(msg => setTimeout(() => msg.delete(), 10000))
      .catch(err => console.error(err));
  },
};