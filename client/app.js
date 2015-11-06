/** @jsx React.DOM */

var ReactDom = require('react-dom');
var React = require('react');
var Detector = require('./lib/Detector');
var Root = require('./components/Root');
var worldDataStore = require('./store/worldDataStore');
var geodecoder = require('./lib/geodecoder');

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  // load world data before starting app
  worldDataStore.init(function(data) {

    // initialize stateful geodecoder
    var countries = topojson.feature(data, data.objects.countries);
    geodecoder.init(countries.features);

    ReactDom.render(
      <Root />,
      document.getElementById('root')
    );
  })
}
