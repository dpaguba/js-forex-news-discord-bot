require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")
// const mogoose = require("mongoose")

const { DISCORD_TOKEN: token } = process.env

const { Client, GatewayIntentBits, Collection } = require("discord.js")
// const { default: mongoose } = require("mongoose")
// const { error } = require("node:console")

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

client.commands = new Collection()
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING]: The command at ${filePath} is missing a required "data" or "execute" property`);
    }
}

// mongoose.connect(database,
//     {
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Connected to the databse!")
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// client.login(token)