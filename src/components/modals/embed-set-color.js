const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-set-color',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const { embedCache } = client;

    let red = interaction.fields.getTextInputValue('ti1');
    let green = interaction.fields.getTextInputValue('ti2');
    let blue = interaction.fields.getTextInputValue('ti3');

    if (isNaN(parseInt(red))) await interaction.followUp({ embeds: [client.embeds.errEmbed('Invalid number provided for red')], ephemeral: true });
    if (isNaN(parseInt(green))) await interaction.followUp({ embeds: [client.embeds.errEmbed('Invalid number provided for green')], ephemeral: true });
    if (isNaN(parseInt(blue))) await interaction.followUp({ embeds: [client.embeds.errEmbed('Invalid number provided for blue')], ephemeral: true });

    red = parseInt(red, 10);
    green = parseInt(green, 10);
    blue = parseInt(blue, 10);

    if (red > 255) await interaction.followUp({ embeds: [client.embeds.errEmbed('Red can not be greater than 255')], ephemeral: true });
    if (green > 255) await interaction.followUp({ embeds: [client.embeds.errEmbed('Green can not be greater than 255')], ephemeral: true });
    if (blue > 255) await interaction.followUp({ embeds: [client.embeds.errEmbed('Blue can not be greater than 255')], ephemeral: true });

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) {
      cachedEmbed = embedCache.set(interaction.member.id, { color: [red, green, blue] });
    }
    cachedEmbed.color = [red, green, blue];
    cachedEmbed = embedCache.set(interaction.member.id, cachedEmbed);

    const newEmbed = new EmbedBuilder()
      .setColor(cachedEmbed.color)
      .setDescription(embed.description)
      .setFooter(embed.footer)
      .setTitle(embed.title);

      if (embed.image) newEmbed.setImage(embed.image);

    await interaction.update({ embeds: [newEmbed] });
  },
};