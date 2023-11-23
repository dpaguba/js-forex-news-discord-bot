require("dotenv").config();
const { REST, Routes } = require("discord.js");
const {
    CLIENT_ID: clientId,
    GUILD_ID: guildId,
    DISCORD_TOKEN: token,
} = process.env;
const fs = require("node:fs");

console.log(token);

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

