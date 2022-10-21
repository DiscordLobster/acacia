const { createWriteStream } = require('fs');
const cmdLogger = createWriteStream('./src/logs/commands.log', { flags: 'a' });
const buttonLogger = createWriteStream('./src/logs/buttons.log', { flags: 'a' });
const menuLogger = createWriteStream('./src/logs/menus.log', { flags: 'a' });
const modalLogger = createWriteStream('./src/logs/modals.log', { flags: 'a' });

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const { commands, buttons, menus, modals } = client;
        const { commandName, customId } = interaction;

        if (interaction.isCommand()) {
            const command = commands.get(commandName);
            if (!command) return interaction.reply({ content: 'No code was found for this command!', ephemeral: true });

            try {
                await command.execute(interaction, client);
                cmdLogger.write(`${interaction.user.tag} used ${commandName} in ${interaction.channel.name}\n`);
            }
            catch (err) {
                console.error(err);
                if (interaction.isRepliable()) return interaction.reply({ content: `${err}`, ephemeral: true }) || interaction.editReply({ content: `${err}` });
            }
        }
        else if (interaction.isButton()) {
            const button = buttons.get(customId);
            if (!button) return interaction.update({ content: 'No code was found for this button!' });

            try {
                await button.execute(interaction, client);
                buttonLogger.write(`${interaction.user.tag} used button: ${customId} on interaction: ${interaction.id} in channel: ${interaction.channel.name}\n`);
            }
            catch (err) {
                console.error(err);
                return interaction.update({ content: `${err}` });
            }
        }
        else if (interaction.isSelectMenu()) {
            const menu = menus.get(customId);
            if (!menu) return interaction.update({ content: 'No code was found for this select menu!' });

            try {
                await menu.execute(interaction, client);
                menuLogger.write(`${interaction.user.tag} used menu: ${customId} on interaction: ${interaction.id} in channel: ${interaction.channel.name}\n`);
            }
            catch (err) {
                console.error(err);
                return interaction.update({ content: `${err}` });
            }
        }
        else if (interaction.isModalSubmit()) {
            const modal = modals.get(customId);
            if (!modal) return interaction.update({ content: 'No code was found for this modal!' });

            try {
                await modal.execute(interaction, client);
                modalLogger.write(`${interaction.user.tag} used modal: ${customId} on interaction: ${interaction.id} in channel: ${interaction.channel.name}\n`);
            }
            catch (err) {
                console.error(err);
                return interaction.update({ content: `${err}` });
            }
        }
        else if (interaction.isContextMenuCommand()) {
            const contextCommand = commands.get(commandName);
            if (!contextCommand) return interaction.reply({ content: 'No code was found for this command!', ephemeral: true });

            try {
                await contextCommand.execute(interaction, client);
                cmdLogger.write(`${interaction.user.tag} used context command: ${commandName}\n`);
            }
            catch (err) {
                console.error(err);
                return interaction.reply({ content: `${err}`, ephemeral: true });
            }
        }
    },
};