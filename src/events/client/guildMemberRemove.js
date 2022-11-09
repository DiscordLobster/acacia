module.exports = {
  name: 'guildMemberRemove',
  async execute(member, client) {
    const { localUsers } = client;
    const channel = await client.channels.fetch('1037500239092924549');
    if (!channel) return;

    await channel.edit({ name: `Members: ${member.guild.memberCount}` });

    const user = await localUsers.fetch(member.id);
    if (!user) return;
    else await localUsers.remove(member.id);
  },
};