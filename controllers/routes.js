var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');

var Comment = require('../models/comments.js');
var Article = require('../models/article.js');
var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadLines';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

router.get('/', function(req, res) {
  Article.find({}, null, {sort: {created: -1}}, function(err, data) {
    if (data.length === 0) {
      res.redirect('/scrape');
    } else {
      res.redirect('/articles');
    }
  });
});

router.get('/scrape', (req, res) => {
  // my code
  var titlesArray = [];
  var results = [];
  axios.get('https://www.nytimes.com/section/world').then(response => {
    var $ = cheerio.load(response.data);
    $('article').each(function(i, element) {
      var result = {};
      result.title = $(element)
        .find('h2')
        .text()
        .trim();
      result.link = $(element)
        .find('a')
        .attr('href');
      result.summary = $(element)
        .find('p')
        .text()
        .trim();
      var img = $(element)
        .parent()
        .find('img')
        .attr('src');
      if (img) {
        result.img = img;
      }
      var newArticle = new Article(result);
      if (titlesArray.indexOf(result.title) === -1) {
        titlesArray.push(result.title);
        Article.count({title: result.title}, function(err, dupeCheck) {
          if (dupeCheck === 0) {
            var entry = new Article(result);
            entry.save(function(err, doc) {
              if (err) {
                console.log(err);
              } else {
              }
            });
          } else {
          }
        });
      } else {
      }
    });
  }, res.redirect('/articles'));
});

router.get('/articles', function(req, res) {
  Article.find()
    .sort({_id: -1})

    .populate('comments')

    .exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        var expbsObject = {articles: data};
        res.render('index', expbsObject);
      }
    });
});

module.exports = router;