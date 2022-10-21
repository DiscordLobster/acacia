const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'add-level-role',
  },
  async execute(interaction, client) {
    const { levelRoles } = client;
    let embed = await interaction.message.embeds[0];

    let level = interaction.fields.getTextInputValue('ti1');
    if (isNaN(parseInt(level))) return interaction.reply({ embeds: [client.embeds.errEmbed('Invalid number provided for level')], ephemeral: true });
    level = parseInt(level, 10);
    if (level < 1) return interaction.reply({ embeds: [client.embeds.errEmbed('Level has to be greater than 0!')], ephemeral: true });

    let role = interaction.fields.getTextInputValue('ti2');
    role = await interaction.guild.roles.fetch(role);
    if (!role) return interaction.reply({ embeds: [client.embeds.errEmbed('Provided ID is not a valid role!')], ephemeral: true });

    const levelRole = await levelRoles.add(interaction.guild.id, level, role.id);

    embed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setFooter(embed.footer)
      .setColor(embed.color)
      .setDescription(`Successfully attached ${role} to level ${levelRole.level}`);

    await interaction.update({ embeds: [embed], components: [] });
  },
};