const fs = require('fs');
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("news")
        .setDescription("Shows economic news"),
    async execute(interaction) {
        let answer = ""
        try {
            const jsonString = fs.readFileSync('commands/economic_calendar.json', 'utf-8');
            const jsonData = JSON.parse(jsonString);

            for (news of jsonData) {
                if (news.impact === "High") {
                    answer += "🔴  "
                } else {
                    answer += "🟠  "
                }

                answer += `${news.date} - ${news.event} - ${news.currency}\n`
            }

            await interaction.reply(answer)

        } catch (error) {
            console.error('Error parsing JSON:', error.message);
        }

    }
}