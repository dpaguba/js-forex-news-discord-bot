// pull all variables from .env file
require("dotenv").config
const fs = require("node:fs")
const path = ("node:path")

const { DISCORD_TOKEN: token } = process.env

