const express = require('express');
const app = express();
app.listen(8080, function() {
    console.log('App listening on port 8080');
});

const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');

require('dotenv').config();

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extender: true }));

const config = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    number: process.env.NUMBER
};

const nexmo = new Nexmo({
    apiKey: config.apiKey,
    apiSecret: config.apiSecret,
    number: config.number
}, {debug: true});

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', function (req, res) {
    res.send(req.body);
    console.log('req.body', req.body);

    const toNumber = req.body.number;
    const text = req.body.text;
    const from = req.body.from;

    nexmo.message.sendSms(
        from, toNumber, text, {type: 'unicode'},
        function (err, res) {
            if (err) {
                console.log('error');
            } else {
                console.log('res', res);
            }
        }
    );
});