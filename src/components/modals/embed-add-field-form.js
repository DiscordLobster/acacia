const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-add-field-form',
  },
  async execute(interaction, client) {
    const name = interaction.fields.getTextInputValue('ti1');
    const value = interaction.fields.getTextInputValue('ti2');

    const { embedCache } = client;
    const embed = await interaction.message.embeds[0];

    const newEmbed = new EmbedBuilder();

    const cachedData = embedCache.get(interaction.member.id);
    if (!cachedData) {
      embedCache.set(interaction.member.id, {
        fields: [{ name: name, value: value, inline: false }],
      });
    }

    if (cachedData.fields === undefined) {
      cachedData.fields = [{ name: name, value: value, inline: false }];
      embedCache.set(interaction.member.id, cachedData);
    }
    else {
      cachedData.fields.push({ name: name, value: value, inline: false });
      embedCache.set(interaction.member.id, cachedData);
    }

    newEmbed.setAuthor(embed.author);
    newEmbed.setColor(embed.color);
    newEmbed.setFooter(embed.footer);
    newEmbed.setDescription(embed.description);
    newEmbed.addFields(cachedData.fields);

    if (embed.image) newEmbed.setImage(embed.image);

    await interaction.update({ embeds: [newEmbed] });
  },
};
