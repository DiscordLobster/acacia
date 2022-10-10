const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-economy',
  },
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];
    const settings = await client.botSettings.fetch(interaction.guild.id);

    const b1 = new ButtonBuilder()
      .setCustomId('settings-money-rate')
      .setLabel('Set Money Rate')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('settings-money-name')
      .setLabel('Set Currency Name')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().setComponents(b1, b2);

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription('These are the settings for the economy aspect of the bot. You can set the rate at which ' +
        'money is earned and set the currency name here.\n\n*Please note that when you set your money rate that ' +
        'you follow all the rules to avoid errors and mistakes. The currency name can be set to anything with ' +
        'a maximum of 255 characters.*')
      .addFields(
        { name: 'Money Rate', value: `${settings.money_min} - ${settings.money_max}`, inline: true },
        { name: 'Currency Name', value: `${settings.currency_name}`, inline: true },
      );

      await interaction.update({ embeds: [newEmbed], components: [row] });
  },
};