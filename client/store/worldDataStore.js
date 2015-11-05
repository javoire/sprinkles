var store = {};

module.exports = {
  init: function(cb) {
    d3.json('data/world.json', function (err, data) {
      store = data;
      return cb(store);
    });
  },
  getData: function() {
    return store;
  }
}
