const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-leveling',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const settings = await client.botSettings.fetch(interaction.guild.id);

    const b1 = new ButtonBuilder()
      .setCustomId('settings-xp-rate')
      .setLabel('Set XP Rate')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('settings-lvl-up-msg')
      .setLabel('Set Level Up Message')
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('settings-level-roles')
      .setLabel('Level Roles')
      .setStyle(ButtonStyle.Primary);

    const b4 = new ButtonBuilder()
      .setCustomId('settings-level-formula')
      .setLabel('Level Formula')
      .setDisabled(true)
      .setStyle(ButtonStyle.Primary);

    const row1 = new ActionRowBuilder().setComponents(b1, b2, b3, b4);

    const newEmbed = new EmbedBuilder()
      .setTitle('Settings | Leveling')
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription('Below you can view various settings for the leveling system of the bot. Including the ' +
      'xp rate, leveling formula, level roles and level up message. More settings might become available to ' +
      'adjust in the future.\n\nPlease use the buttons below to adjust and change settings. Follow all instructions ' +
      'to avoid errors and mistakes.\n\n*Use `%l` to include the user\'s level in the level up message.*')
      .addFields(
        { name: 'XP Rate', value: `${settings.xp_min} - ${settings.xp_max}`, inline: false },
        { name: 'Level Up Message', value: `"${settings.lvl_up_msg}"`, inline: false },
      );

    await interaction.update({ embeds: [newEmbed], components: [row1] });
  },
};