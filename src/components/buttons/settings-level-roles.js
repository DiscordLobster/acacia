const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-level-roles',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const b1 = new ButtonBuilder()
      .setCustomId('settings-add-lvl-role')
      .setLabel('Add Role')
      .setStyle(ButtonStyle.Success);

    const b2 = new ButtonBuilder()
      .setCustomId('settings-remove-lvl-role')
      .setLabel('Remove Role')
      .setStyle(ButtonStyle.Danger);

    // Fetch level roles

    const row = new ActionRowBuilder().setComponents(b1, b2);

    const newEmbed = new EmbedBuilder()
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription('You can add or remove level roles for the bot to give out once a user reaches a certain ' +
        'level. You can only assign one role per level, and you can\'t have any repeat roles or levels. You can ' +
        'view a list of all level roles below. If there aren\'t any that is because none have been set.');

      // Add field for level roles

    await interaction.update({ embeds: [newEmbed], components: [row] });
  },
};