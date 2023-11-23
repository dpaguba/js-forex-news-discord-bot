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

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}