const http = require('https');

const options = {
    method: 'GET',
    hostname: 'forex-news-alerts.p.rapidapi.com',
    port: null,
    path: '/api/v1/ForexArticleDetails/Req123456/bf4dfb95-cef1-492c-948e-b5023a9c23eb:AUDUSD-20201015',
    headers: {
        'X-RapidAPI-Key': '62256a3dc6msheeb4458a2735758p13b70bjsncc100bed6959',
        'X-RapidAPI-Host': 'forex-news-alerts.p.rapidapi.com'
    }
};

const req = http.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();