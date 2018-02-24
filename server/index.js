const express = require('express');
const app = express();
const server = app.listen(8080, () => {
    console.log('App listening on port 8080');
});

const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extender: true }));

app.get('/', (req, res) => {
    res.render('index');
});