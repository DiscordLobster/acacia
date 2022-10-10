const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'set-money-name-modal',
  },
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];
    const input = interaction.fields.getTextInputValue('ti1');

    await client.botSettings.setMoneyName(interaction.guild.id, input);

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription(`Successfully set the currency name to: ${input}`);

    await interaction.update({ embeds: [newEmbed], components: [] });
  },
};