const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");


// API Routes
router.get("/api/articles", function(req, res) {
  db.Article
    .find(req.query)
    .sort({ date: -1 })
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.status(422).json(err));
});

router.post("/api/articles", function(req, res) {
  const article = {
    _id: req.body._id,
    title: req.body.headline.main,
    url: req.body.web_url
  };
  db.Article
    .create(article)
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.status(422).json(err));
});

router.get("/api/articles/:id", function(req, res) {
  db.Article
    .findById(req.params.id)
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.status(422).json(err));
})

router.put("/api/articles/:id", function(req, res) {
  db.Article
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.status(422).json(err));
})

router.delete("/api/articles/:id", function(req, res) {
  db.Article
    .findById({ _id: req.params.id })
    .then(dbArticle => dbArticle.remove())
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.status(422).json(err));
})

router.get("/api/nyt", function(req, res) {
  const params = Object.assign(
    { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
    req.query
  );
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      //ES6 shorthand 
      params
    })
    .then(response => {
      db.Article
        .find()
        .then(dbArticles =>
          response.data.response.docs.filter(article =>
            dbArticles.every(
              dbArticle => dbArticle._id.toString() !== article._id
            )
          )
        )
        .then(articles => res.json(articles))
        .catch(err => res.status(422).json(err));
    });
})

// If no API routes are hit, send the React app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;