const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'help-admin',
  },
  async execute(interaction, client) {
    let { commands } = client;

    commands = commands.filter(key => key.category === 'Administration');

    if (commands.size < 1) commands = ['No commands found'];
    else commands = commands.map(key => `**/${key.data.name} ${key.args ?? ''}** - ${key.data.description}`);

    const embed = await interaction.message.embeds[0];

    const newEmbed = new EmbedBuilder()
      .setTitle('Help | Administration')
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription(`${commands.join('\n')}`);

    await interaction.update({ embeds: [newEmbed] });
  },
};