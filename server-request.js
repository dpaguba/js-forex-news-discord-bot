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

let responseData = '';



function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
