var express    = require('express');
var bodyParser = require('body-parser');
var apicache   = require('apicache');
var apicachemw = apicache.options({debug: true}).middleware;
var routes     = require('./routes');
var logger     = require('./logger')

var app  = express();
var port = process.env.PORT || 8080;

// server our public shitz
app.use(express.static('public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS yo
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/_cache', routes.cacherouter);
app.use('/api', apicachemw('30 minutes'), routes.router);

app.listen(port, function(){
  logger.info('Magic happens on http://localhost:' + port);  
});
