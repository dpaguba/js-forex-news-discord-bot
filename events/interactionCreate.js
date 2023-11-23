const { Events } = require("discord.js");
const profileModule = require("../models/profileSchema")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // get user information 
        let profileData
        try {
            profileData = await profileModule.findOne({ userId: interaction.user.id })
            if (!profileData) {
                profileData = await profileModule.create({
                    userId: interaction.user.id,
                    serverId: interaction.guild.id,
                })
            }
        } catch (error) {
            console.log(error);
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction, profileData);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};