const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: {
    name: 'add-welcome-channel-modal',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const ti1 = interaction.fields.getTextInputValue('ti1');
    const channel = await interaction.guild.channels.fetch(ti1);
    if (!channel || channel.type !== ChannelType.GuildText) return interaction.update({ content: 'You provided an invalid channel ID! Make sure it\'s a valid server text channel!', embeds: [], components: [] });
    const embed = await interaction.message.embeds[0];
    await client.botSettings.addWelcomeChannel(interaction.guild.id, channel.id);

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription(`Successfully added ${channel} to the list of welcome channels!`);

    await interaction.update({ embeds: [newEmbed], components: [] });
  },
};