const https = require('https');
const fs = require('fs');
const { formatDate } = require('./utils');

const { APIKEY: apikey } = process.env;

function fetchDataAndWriteToFile() {
    const currentDate = new Date().toDateString();

    const options = {
        hostname: 'financialmodelingprep.com',
        port: 443,
        path: `/api/v3/economic_calendar?from=${formatDate(currentDate)}&to=${formatDate(currentDate)}&apikey=${apikey}`,
        method: 'GET'
    };

    let responseData = '';

    const req = https.request(options, (res) => {
        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            const jsonData = JSON.parse(responseData).filter((data) => {
                delete data.country;
                delete data.change;
                delete data.changePercentage;
                delete data.actual;

                const options = { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' };
                data.date = new Date(data.date).toLocaleTimeString('en-GB', options) + ' CET';

                return (
                    (data.currency === 'EUR' || data.currency === 'GBP' || data.currency === 'USD') &&
                    (data.impact === 'Medium' || data.impact === 'High')
                );
            });

            fs.writeFileSync('commands/economic_calendar.json', JSON.stringify(jsonData, null, 2));
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.end();
}

module.exports = { fetchDataAndWriteToFile };
