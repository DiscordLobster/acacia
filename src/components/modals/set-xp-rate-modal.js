const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'set-xp-rate-modal',
  },
  async execute(interaction, client) {
    const min = interaction.fields.getTextInputValue('ti1');
    const max = interaction.fields.getTextInputValue('ti2');

    const embed = await interaction.message.embeds[0];

    if (min < 1 || isNaN(parseInt(min))) return interaction.update({ embeds: [client.embeds.errEmbed(`\`${min}\` is not a valid positive integer! Please try again!`)] });
    if (max < 1 || isNaN(parseInt(max))) return interaction.update({ embeds: [client.embeds.errEmbed(`\`${max}\` is not a valid positive integer! Please try again!`)] });

    if (parseInt(max, 10) < parseInt(min, 10)) return interaction.update({ embeds: [client.embeds.errEmbed('Your minimum number can\'t be greater than your maximum number! Please try again!')] });

    await client.botSettings.setXpRate(interaction.guild.id, parseInt(min), parseInt(max));

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setFooter(embed.footer)
      .setColor(embed.color)
      .setDescription(`Successfully set the XP Rate to \`${min} - ${max}\``);

    await interaction.update({ embeds: [newEmbed], components: [] });
  },
};