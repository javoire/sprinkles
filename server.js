var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var LastfmAPI = require('lastfmapi');
var echojs    = require('echojs');

var lfm = new LastfmAPI({
  'api_key' : process.env.LFM_KEY,
  'secret' : process.env.LFM_SECRET
});

var echo = echojs({
  key: process.env.ECHONEST_KEY
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();

router.get('/:user', function(req, res) {
  lfm.user.getTopArtists({"user": req.params.user, "period": "overall" },
    function (err, artists) {
    if (err) { return console.log('We\'re in trouble', err); }

    res.json(artists);
    });
  });


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
