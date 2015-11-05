/** @jsx React.DOM */

var ReactDom = require('react-dom');
var React = require('react');
var Detector = require('./lib/Detector');
var Root = require('./components/Root');
var geodecoder = require('geodecoder');

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  // Start app
  // show welcome screen
  d3.json('data/world.json', function (err, data) {

    // initialize stateful geodecoder
    var countries = topojson.feature(this.props.worldData, this.props.worldData.objects.countries)
    geodecoder.init(countries.features);

    ReactDom.render(
      <Root worldData={data} />,
      document.getElementById('root')
    );
  });
}
