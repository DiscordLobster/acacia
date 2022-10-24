const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-set-description',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const { embedCache } = client;

    const desc = interaction.fields.getTextInputValue('ti1');

    const cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) {
      embedCache.set(interaction.member.id, { description: desc });
    }
    else {
      cachedEmbed.description = desc;
      embedCache.set(interaction.member.id, cachedEmbed);
    }

    const newEmbed = new EmbedBuilder()
      .setColor(embed.color)
      .setDescription(`${desc}`)
      .setFooter(embed.footer)
      .setTitle(embed.title);

      if (embed.image !== undefined) newEmbed.setImage(embed.image);
      if (embed.fields) newEmbed.addFields(embed.fields);

    await interaction.update({ embeds: [newEmbed] });
  },
};