var express = require('express');

var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/routes.js');

app.use(routes);
//mongoose.connect(MONGODB_URI);

app.listen(port, () => console.log(`App listening on port ${port}!`));