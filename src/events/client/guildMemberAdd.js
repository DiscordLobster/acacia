module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const channel = await client.channels.fetch('1037500239092924549');
    if (!channel) return;

    await channel.edit({ name: `Members: ${member.guild.memberCount}` });
  },
};