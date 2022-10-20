const { EmbedBuilder } = require('discord.js');
const { isImage } = require('../../utilities/Checkers');

module.exports = {
  data: {
    name: 'embed-set-image',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const { embedCache } = client;

    const image = interaction.fields.getTextInputValue('ti1');

    if (!isImage(image)) return interaction.reply({ embeds: [client.embeds.errEmbed('Invalid image url provided!')], ephemeral: true });

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) {
      cachedEmbed = embedCache.set(interaction.member.id, { image: image });
    }
    cachedEmbed.image = image;
    embedCache.set(interaction.member.id, cachedEmbed);

    const newEmbed = new EmbedBuilder()
      .setColor(embed.color)
      .setDescription(`${embed.description}`)
      .setFooter(embed.footer)
      .setTitle(embed.title);

      if (cachedEmbed.image) newEmbed.setImage(cachedEmbed.image);

    await interaction.update({ embeds: [newEmbed] });
  },
};