require("dotenv").config()
const https = require('https');
const fs = require('fs');
const { log } = require("console");
const { time } = require("discord.js");

const { APIKEY: apikey } = process.env

const currentDate = new Date().toDateString();

const options = {
    hostname: 'financialmodelingprep.com',
    port: 443,
    path: `/api/v3/economic_calendar?from=${formatDate(currentDate)}&to=${formatDate(currentDate)}&apikey=${apikey}`,
    method: 'GET'
}

