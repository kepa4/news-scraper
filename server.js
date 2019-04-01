var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => res.send(index.html));

app.listen(port, () => console.log(`App listening on port ${port}!`));