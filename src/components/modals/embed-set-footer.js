const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-set-footer',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const { embedCache } = client;

    const footer = interaction.fields.getTextInputValue('ti1');

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) {
      cachedEmbed = embedCache.set(interaction.member.id, { footer: { text: footer } });
    }
    cachedEmbed.footer = { text: footer };
    embedCache.set(interaction.member.id, cachedEmbed);

    const newEmbed = new EmbedBuilder()
      .setColor(embed.color)
      .setDescription(embed.description)
      .setFooter(cachedEmbed.footer)
      .setTitle(embed.title);

      if (embed.image) newEmbed.setImage(embed.image);

    await interaction.update({ embeds: [newEmbed] });
  },
};