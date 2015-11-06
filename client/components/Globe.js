/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var GlobeFactory = require('../lib/GlobeFactory');
var geodecoder = require('../lib/geodecoder');
var globeStore = require('../store/globeStore');

module.exports = React.createClass({
  componentDidMount: function() {
    var element = ReactDom.findDOMNode(this.refs.globe);

    var globe = GlobeFactory.createGlobe(element);
    globe.animate();

    globeStore.set(globe); // stupid
  },
  componentDidUpdate: function() {
    // this is not correct?

    if (!this.props.userCountryData) {
      return;
    }

    var globe = globeStore.get(); // stupid

    globe.paintCountryTextures(this.props.userCountryData, geodecoder);

    // countriesTopList(data);
  },
  render: function () {
    return (
      <div ref="globe" id="globe"></div>
    )
  }
});
