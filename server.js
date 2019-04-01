var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');

var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(express.json());
//mongoose.connect(MONGODB_URI);

app.get('/', (req, res) => res.send(index.html));

app.get('/scrape', (req, res) => {
  // my code
  axios.get('https://www.nytimes.com/section/world').then(response => {
    var $ = cheerio.load(response.data);
    var results = [];
    //  Process one story
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
        .find('figure.media')
        .find('img')
        .attr('src');
      if (img) {
        result.img = img;
      }
      console.log(result);
      results.push(result);
    });
    console.log(results);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));