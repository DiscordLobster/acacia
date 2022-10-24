const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-send-current',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const { embedCache } = client;
    const clientMember = await interaction.guild.members.fetch(client.user.id);
    let embed = embedCache.get(interaction.member.id);
    if (!embed) embed = { description: 'This is a test embed', color: clientMember.displayColor };

    embedCache.delete(embed);

    const newEmbed = new EmbedBuilder();

    if (embed.title !== undefined) newEmbed.setTitle(`${embed.title}`);
    if (embed.description !== undefined) {
      newEmbed.setDescription(`${embed.description}`);
    }
    else {
      newEmbed.setDescription('This is a test embed');
    }
    if (embed.footer !== undefined) newEmbed.setFooter(embed.footer);
    if (embed.color !== undefined) {
      newEmbed.setColor(embed.color);
    }
    else {
      newEmbed.setColor(clientMember.displayColor);
    }
    if (embed.image !== undefined) newEmbed.setImage(embed.image);
    if (embed.fields !== undefined) newEmbed.addFields(embed.fields);

    await interaction.channel.send({ embeds: [newEmbed] });

    await interaction.update({ content: 'Successfully sent embed', embeds: [], components: [] });
  },
};