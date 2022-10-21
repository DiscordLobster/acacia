const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  category: 'Economy',
  args: '<amount>',
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Deposit money into your bank from your wallet')
    .addNumberOption(o => o.setName('amount').setDescription('Input a valid number').setRequired(true)),
  async execute(interaction, client) {
    let amount = interaction.options.getNumber('amount');

    const { localUsers, botSettings } = client;

    const settings = await botSettings.fetch(interaction.guild.id);

    let localUser = await localUsers.fetch(interaction.member.id);
    if (!localUser) return interaction.reply({ embeds: [client.embeds.errEmbed('No data was found for this user!')], ephemeral: true });

    if (amount > localUser.wallet) amount = localUser.wallet;

    if (localUser.wallet < 1) return interaction.reply({ embeds: [client.embeds.errEmbed('You don\'t have any money in your wallet!')], ephemeral: true });

    localUser = await localUsers.removeWallet(interaction.user.id, amount);
    localUser = await localUsers.addBank(interaction.user.id, amount);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.member.displayAvatarURL(true) })
      .setColor(interaction.member.displayColor)
      .setDescription(`Successfully deposited ${amount} ${settings.currency_name} to your bank!\n\n**Wallet:** ${localUser.wallet} ${settings.currency_name}\n**Bank:** ${localUser.bank} ${settings.currency_name}`)
      .setFooter({ text: `${localUser.total} total` });

    await interaction.reply({ embeds: [embed], fetchReply: true })
      .then(msg => setTimeout(() => msg.delete(), 10000))
      .catch(err => console.error(err));
  },
};