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
    this.setState({globe: globe});
  },
  componentDidUpdate: function() {
    // this is not correct

    if (!this.props.userCountryData) {
      return;
    }

    var data = this.props.userCountryData;
    var geo = this.props.geo;
    var globe = this.state.globe;

    var baseRed = 46;
    var baseGreen = 189;
    var baseBlue = 89;
    var textures = [];
    data.sort(function (a, b) {
      return b.percent - a.percent;
    });
    var maxval = data[0].percent * 100;
    data.forEach(function (country) {
      var countryGeojson = geo.find(country.country);
      if (countryGeojson) {
        var alpha = country.percent * 100 / maxval;
        var rgb = 'rgba(' + baseRed + ', ' + baseGreen + ', ' + baseBlue + ', ' + alpha + ')';
        console.log(rgb);
        textures.push(mapTexture({features: [countryGeojson], type: "FeatureCollection"}, rgb, 'black'));
      }
    });

    globe.updateOverlays(textures);
    // countriesTopList(data);
  },
  render: function () {
    return (
      <div ref="globe" id="globe"></div>
    )
  }
});
