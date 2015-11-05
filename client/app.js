/** @jsx React.DOM */

var ReactDom = require('react-dom');
var React = require('react');
var Detector = require('./lib/Detector');
var WelcomeScreen = require('./components/WelcomeScreen');
var Globe = require('./components/Globe');

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  // Start app
  // show welcome screen
  d3.json('data/world.json', function (err, data) {

    ReactDom.render(
      <div className="main">
        <WelcomeScreen />
        <Globe worldData={data} />
      </div>,
      document.getElementById('root')
    );

    // globe = renderGlobe(data);
    // globe.animate();
    // welcomeScreen();
  });
}
