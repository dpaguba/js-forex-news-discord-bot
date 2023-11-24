require("dotenv").config()
const https = require('https');
const fs = require('fs');
const { log } = require("console");
const { time } = require("discord.js");

const { APIKEY: apikey } = process.env

