const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'set-lvl-up-msg',
  },
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const msg = interaction.fields.getTextInputValue('ti1');

    await client.botSettings.setLvlUpMsg(interaction.guild.id, msg);

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription(`Successfully set the level up message to:\n\n*"${msg}"*`);

    await interaction.update({ embeds: [newEmbed], components: [] });
  },
};