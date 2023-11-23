require("dotenv").config
const fs = require("node:fs")
const path = ("node:path")

const { DISCORD_TOKEN: token } = process.env

// require necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require("discord.js")

