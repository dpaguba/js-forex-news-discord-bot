const request = require('request');

const options = {
    method: 'GET',
    url: 'https://forex-news-alerts.p.rapidapi.com/api/v1/ForexArticleDetails/Req123456/bf4dfb95-cef1-492c-948e-b5023a9c23eb:EURUSD-20231123',
    headers: {
        'X-RapidAPI-Key': '62256a3dc6msheeb4458a2735758p13b70bjsncc100bed6959',
        'X-RapidAPI-Host': 'forex-news-alerts.p.rapidapi.com'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    try {
        const { result } = JSON.parse(body);

        console.log(response);

        // if (newsList && newsList.length > 0) {
        //     console.log('List of News Articles:');
        //     newsList.forEach(article => {
        //         console.log(`- Title: ${article.title}`);
        //         console.log(`  Description: ${article.description}`);
        //         console.log(`  URL: ${article.url}`);
        //         console.log('------------------------');
        //     }
        //     );
        // } else {
        //     console.log('No news articles found.');
        // }
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});