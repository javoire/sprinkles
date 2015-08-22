 var winston = require('winston');

 // TODO: log to file

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        var date = new Date();
        return date.toUTCString();
      },
      formatter: function(options) {
        return options.timestamp() +' ['+ options.level.toUpperCase() +'] - '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

 module.exports = logger;