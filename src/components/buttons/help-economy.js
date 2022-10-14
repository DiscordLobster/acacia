const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'help-economy',
  },
  async execute(interaction, client) {
    let { commands } = client;

    commands = commands.filter(key => key.category === 'Economy');

    if (commands.size < 1) commands = ['No commands found'];
    else commands = commands.map(key => `**/${key.data.name} ${key.args ?? ''}** - ${key.data.description}`);

    const embed = await interaction.message.embeds[0];

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription(`${commands.join('\n')}`);

    await interaction.update({ embeds: [newEmbed] });
  },
};