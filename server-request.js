require("dotenv").config()
const https = require('https');
const fs = require('fs');

const { APIKEY: apikey } = process.env

const currentDate = new Date().toDateString();

const options = {
    hostname: 'financialmodelingprep.com',
    port: 443,
    path: `/api/v3/economic_calendar?from=${formatDate(currentDate)}&to=${formatDate(currentDate)}&apikey=${apikey}`,
    method: 'GET'
}

let responseData = '';

const req = https.request(options, (res) => {
    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        const jsonData = JSON.parse(responseData).filter(
            function (data) {

                delete data.country
                delete data.change
                delete data.changePercentage
                delete data.actual

                // maybe its bug, but i need to put utc+2 (im in utc+1), so this works properly
                const options = { timeZone: "Europe/Kyiv", hour: "2-digit", minute: "2-digit" };
                data.date = new Date(data.date).toLocaleTimeString("en-GB", options) + " CET"

                return (data.currency === "EUR" || data.currency === "GBP" || data.currency === "USD") && (data.impact === "Medium" || data.impact === "High")
            }
        );
        fs.writeFileSync('commands/economic_calendar.json', JSON.stringify(jsonData, null, 2));
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();


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
