/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var GlobeFactory = require('../lib/GlobeFactory');
var geodecoder = require('../lib/geodecoder');
var worldDataStore = require('../store/worldDataStore');

module.exports = React.createClass({
  componentDidMount: function() {
    var worldData = worldDataStore.getData();
    var countries = topojson.feature(worldData, worldData.objects.countries)
    var element = ReactDom.findDOMNode(this.refs.globe);

    globe = GlobeFactory.createGlobe(element, countries)
    globe.animate();

    // TODO: get rid of setting the globe on UI state
    this.setState({globe: globe});
  },
  componentDidUpdate: function() {
    // this is not correct

    if (!this.props.userCountryData) {
      return;
    }

    var globe = this.state.globe;

    globe.paintCountyTextures(this.props.userCountryData, geodecoder);

    // countriesTopList(data);
  },
  render: function () {
    return (
      <div ref="globe" id="globe"></div>
    )
  }
});
