var axios = require('axios');
var cheerio = require('cheerio');

var scrape = function () {
    return axios.get('https://www.nytimes.com/').then(function (res) {
        var $ = cheerio.load(res.data);
        var articles = [];
        $('div.gs-c-promo-body').each(function (i, element) {
            var head = $(this)
                .find('h3')
                .text()
                .trim();

            var url = $(this)
                .find('a')
                .attr('href');

            var sum = $(this)
                .find('p')
                .text()
                .trim();

            if (head && sum && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: url
                };

                articles.push(dataToAdd);
            }
        });
        return articles;
    });
};

module.exports = scrape;