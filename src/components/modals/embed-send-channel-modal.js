const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-send-channel-modal',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);
    let embed = client.embedCache.get(interaction.member.id);
    if (!embed) embed = { description: 'This is a test embed', color: clientMember.displayColor };

    let channel = interaction.fields.getTextInputValue('ti1');

    channel = await interaction.guild.channels.fetch(channel);
    if (!channel) return interaction.reply({ embeds: [client.embeds.errEmbed('Invalid channel ID provided!')], ephemeral: true });
    if (channel.type !== ChannelType.GuildText) return interaction.reply({ embeds: [client.embeds.errEmbed('Channel should be a valid text channel!')], ephemeral: true });

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

    await client.embedCache.delete(interaction.member.id);

    await interaction.update({ content: 'Successfully sent embed', embeds: [], components: [] });

    await channel.send({ embeds: [newEmbed] });
  },
};