const express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    dBase = require('./data_config/db'),
    cors = require('cors'),
    app = express(),
    path = require('path');

let article = {};

app.use(cors()); /*Cross-Origin Resource Sharing to express*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

/*parse data from url*/
app.get('/api/article?', (req, res) => {
    const url = req.query.url;
    request({url, encoding: false}, (err, res, body) => {
        if (err) throw err;

        const $ = cheerio.load(body);
            title = $('main > article > header > div > div > h2').text();

        article.title = title;

        let item,
            itemParagraph;

        article.paragraphs = [];

        $('main > article > div > div > p').each(function () {
            item = $(this).text();
            itemParagraph = item.replace(/<[^>]+>/g,'');

            article.paragraphs.push(itemParagraph);
        });
    });
    res.send(article);
});

/*add new paragraph*/
app.post('/api/paragraphs', (req, res) => {
    const url = req.body.articleURL,
        original = req.body.originalText,
        users = req.body.usersText;

    let paragraph = {
        articleURL: url,
        originalText: original,
        usersText: users,
        isApproved: false
    };

    db.collection('paragraphs').insertOne(paragraph, (err, result) => {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        res.send(paragraph);
    });
});

/*get all results*/
app.get('/api/results', (req, res) => {
    db.collection('paragraphs').find({isApproved: false}).toArray((err, result) => {
        if (err) {
            console.log(err);
            return res.send('Error');
        }
        res.send(result);
    });
});

/*update database with results*/
app.put('/api/results', (req, res) => {
    const id = req.body.paragraphID,
        decision = JSON.parse(req.body.decision);

    console.log(decision);
    if (decision === true) {
        db.collection('paragraphs').findOneAndUpdate({_id: ObjectID(id)}, {$set: {isApproved: decision}}, (err, result) => {
            if (err) { return res.send('Error') }
            console.log(result, decision);
        });
    } else if (decision === false) {
        db.collection('paragraphs').deleteOne({_id: ObjectID(id)}, (err, result) => {
            if (err) { return res.send('Error') }
            console.log(result, decision);
        });
    }
});

app.all(/.*/, function root(req, res) {
    res.sendFile(path.resolve('public', 'index.html'));
});

/*start server*/
MongoClient.connect(dBase.url, (err, database) => {
    if (err) { return console.log(err) }

    db = database;
    app.listen(8080, (err, result) => {
        if (err) { return console.log(err) }
        console.log('Start server in port 8080');
    });
});