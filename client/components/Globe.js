/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var DAT = require('../lib/globe');
var mapTexture = require('../lib/mapTexture');

module.exports = React.createClass({
  handleUsernameSubmit: function(e) {
    e.preventDefault();

    // print textures

    return;
  },
  componentDidMount: function() {
    var countries = topojson.feature(this.props.worldData, this.props.worldData.objects.countries);
    var map = ReactDom.findDOMNode(this.refs.globe);
    var globe = new DAT.Globe(map, {
      myCoolTexture: mapTexture(countries, '#222', 'black')
    });
    globe.animate();
  },
  render: function () {
    return (
      <div ref="globe" id="globe"></div>
    )
  }
});
