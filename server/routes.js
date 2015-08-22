var express       = require('express');
var LastfmAPI     = require('lastfmapi');
var echojs        = require('echojs');
var Q             = require('q');
var SpotifyWebApi = require('spotify-web-api-node');
var echonestcache = new (require("node-cache"))({stdTTL: 0, checkperiod: 0});
var countrynames  = require('countrynames');
var _             = require('lodash');
var logger        = require('./logger')

var lfm = new LastfmAPI({
  'api_key': process.env.LFM_KEY,
  'secret': process.env.LFM_SECRET
});

var echo = echojs({
  key: process.env.ECHONEST_KEY
});

var spotify = new SpotifyWebApi();

var router = express.Router();

router.get('/users/:user/:period?', function (req, res) {
  var period = req.params.period || 'overall';
  lfm.user.getTopArtists({user: req.params.user, period: period, limit: 100}, function (err, artists) {
    var promises = [];
    if (err) {
      return logger.warn('getTopArtists failed', err);
    }
    var rank = {};
    artists['artist'].forEach(function (artist, index) {
        var name = artist.name;
        rank[name] = index;
        logger.info("Querying: " + name);
        var deferred = Q.defer();
        promises.push(deferred.promise);
        var json = echonestcache.get(name);
        if (json) {
          logger.info('Loading ' + name + ' from cache');
          deferred.resolve({
            artist: name,
            country: json.response['artist']['artist_location']['country'],
            rank: rank[name]
          });
        } else {
          echo('artist/profile').get({name: name, bucket: 'artist_location'},
            function (err, json) {
              var timer = setTimeout(deferred.resolve, 2000);
              if (err || !json.response.artist || !json.response.artist.artist_location || !json.response.artist.artist_location.country) {
                logger.warn('Echo failed for artist: ' + name, err);
                clearTimeout(timer);
                deferred.resolve();
              }
              else {
                logger.info(name + ' -> ' + json.response['artist']['artist_location']['country']);
                clearTimeout(timer);
                echonestcache.set(name, json);
                deferred.resolve({
                  artist: name,
                  country: json.response['artist']['artist_location']['country'],
                  rank: rank[name]
                });
              }
            })
        }
      }
    );

    Q.all(promises).then(function (artists) {
      var response = {metadata: {}};
      artists = _.compact(artists);
      response['artists'] = artists;
      response['metadata']['countrypercent'] = _.map(_.countBy(artists, "country"), function (value, key) {
        return {
          country: key,
          plays: value,
          percent: value / artists.length,
          artists: _.filter(artists, {country: key})
        }
      });
      return res.json(response)
    });
  });
});


router.get('/countries/:country/:limit?', function (req, res) {
  //FIXME: lastfmapi (the library) crashes if you send in a limit of only 1, always have at least two tracks in the query.
  var limit = Math.min(Math.max(req.params.limit || 1, 1), 10) + 1;
  var promises = [];
  lfm.geo.getTopTracks({country: req.params.country, limit: limit}, function (err, toptracks) {
    if (err) {
      return logger.warn("Failed to fetch top tracks: " + err, toptracks);
    }
    //FIXME: remove the last track, due to the hack above.
    toptracks['track'].slice(0, -1).forEach(function (toptrack) {
      logger.info(toptrack);
      var deferred = Q.defer();
      promises.push(deferred.promise);
      spotify.searchTracks('artist:\'' + toptrack.artist.name + '\' track:\'' + toptrack.name + '\'')
        .then(function (data) {
          logger.info(_.first(data.body.tracks.items).preview_url)
          deferred.resolve({
            artist: toptrack.artist.name,
            track: toptrack.name,
            preview_url: _.first(data.body.tracks.items).preview_url
          })
        }, function (err) {
          logger.error(err);
          deferred.resolve()
        });
    });
    Q.all(promises).then(function (toptracks) {
      var response = {metadata: {}};
      toptracks = _.compact(toptracks);
      response['toptracks'] = toptracks;
      return res.json(response)
    });
  });
});

router.get('/toptracks/:artist/:countryName', function (req, res) {
  var artist = req.params.artist;
  var countryCode = countrynames.getCode(req.params.countryName);
  // get the artist id
  spotify.searchArtists(artist)
    .then(function (data) {

      spotify.getArtistTopTracks(data.body.artists.items[0].id, countryCode)
        .then(function (data) {
          return res.json(data);

          // get top tracks for this artist

          // logger.info(_.first(data.body.tracks.items).preview_url)
          //     deferred.resolve({
          //       artist: toptrack.artist.name,
          //       track: toptrack.name,
          //       preview_url: _.first(data.body.tracks.items).preview_url
          //     })
        }, function (err) {
          logger.error(err);
        });
    }, function (err) {
      logger.error(err);
    });

});

router.get('/availablemarkets', function (req, res) {
  spotify.getArtistTopTracks('43ZHCT0cAZBISjO8DG9PnE', "SE")
    .then(function (data) {
      return res.json(_.first(data.body.tracks).available_markets);
    }, function (err) {
      logger.error(err);
    });
}, function (err) {
  logger.error(err);
});

var cacherouter = express.Router();

cacherouter.get('/clear/:user?', function (req, res) {
  if (req.params.user) {
    return res.json(apicache.clear("/users/" + req.params.user));
  } else {
    return res.json(apicache.clear());
  }
});

module.exports = {
  router: router,
  cacherouter: cacherouter
};