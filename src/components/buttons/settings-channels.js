const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'settings-channels',
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const embed = await interaction.message.embeds[0];

    const b1 = new ButtonBuilder()
      .setCustomId('settings-add-ignored')
      .setLabel('Add Ignored')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('settings-remove-ignored')
      .setLabel('Remove Ignored')
      .setStyle(ButtonStyle.Danger);

    const b3 = new ButtonBuilder()
      .setCustomId('settings-add-welcome')
      .setLabel('Add Welcome')
      .setStyle(ButtonStyle.Primary);

    const b4 = new ButtonBuilder()
      .setCustomId('settings-remove-welcome')
      .setLabel('Remove Welcome')
      .setDisabled(true)
      .setStyle(ButtonStyle.Danger);

    const row1 = new ActionRowBuilder().setComponents(b1, b2);
    const row2 = new ActionRowBuilder().setComponents(b3, b4);

    const newEmbed = new EmbedBuilder()
      .setTitle('Settings | Channels')
      .setAuthor(embed.author)
      .setColor(embed.color)
      .setFooter(embed.footer)
      .setDescription('Below are a list of all channels that are attached to the bot. Whether they\'re ' +
        'ignored channels or welcome channels, you can find them below.\n\nAll channels under the ignored ' +
        'list are channels the bot won\'t give experience or money in.\n\nAll channels under the welcome ' +
        'category are channels the bot will send a custom welcome message in. See the Embeds section of the ' +
        '`/settings` command for more information!\n\nUse the buttons below to add or remove channels for ' +
        'their respective categories. Please provide whole channel IDs. If you\'re unsure of how to do so you ' +
        'can [click here](https://tokenizedhq.com/discord-developer-mode/) to learn how!');

      await interaction.update({ embeds: [newEmbed], components: [row1, row2] });
  },
};