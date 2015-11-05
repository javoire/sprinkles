/** @jsx React.DOM */

var ReactDom = require('react-dom');
var React = require('react');
var Detector = require('./lib/Detector');
var Root = require('./components/Root');

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  // Start app
  // show welcome screen
  d3.json('data/world.json', function (err, data) {

    ReactDom.render(
      <Root worldData={data} />,
      document.getElementById('root')
    );

    // globe = renderGlobe(data);
    // globe.animate();
    // welcomeScreen();
  });
}
