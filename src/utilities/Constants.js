exports.DEFAULT_FOOTER = (client) => {
    return { text: `Powered by: ${client.user.username}`, iconURL: client.user.displayAvatarURL(true) };
};

exports.DEFAULT_COLOR = async (client) => {
    return await client.user.accentColor;
};

exports.CURRENCY_NAME = '<:cc_mushie:1021639451539161138>';