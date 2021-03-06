var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function (req, res) {

    return scrape()
      .then(function (articles) {

        return db.Headline.create(articles);
      })
      .then(function (dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles."
          });
        }
        else {

          res.json({
            message: "Added " + dbHeadline.length + "Newest Articles."
          });
        }
      })
      .catch(function (err) {

        res.json({
          message: err
        });
      });
  }
};