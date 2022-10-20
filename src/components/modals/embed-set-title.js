const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-set-title',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const { embedCache } = client;

    const title = interaction.fields.getTextInputValue('ti1');

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) {
      cachedEmbed = embedCache.set(interaction.member.id, { title: title });
    }
    cachedEmbed.title = title;
    embedCache.set(interaction.member.id, cachedEmbed);

    const newEmbed = new EmbedBuilder()
      .setColor(embed.color)
      .setDescription(`${embed.description}`)
      .setFooter(embed.footer)
      .setTitle(`${title}`);

      if (embed.image) newEmbed.setImage(embed.image);

    await interaction.update({ embeds: [newEmbed] });
  },
};