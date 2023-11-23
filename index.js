require("dotenv").config
const fs = require("node:fs")
const path = ("node:path")

const { DISCORD_TOKEN: token } = process.env

const { Client, GatewayIntentBits, Collection } = require("discord.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ]
})