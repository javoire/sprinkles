/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var WelcomeScreen = require('./WelcomeScreen')
var Globe = require('./Globe')
var $ = require('jquery');
var geodecoder = require('../lib/geodecoder');

module.exports = React.createClass({
  getInitialState: function() {
    countries = topojson.feature(this.props.worldData, this.props.worldData.objects.countries);
    return {
      worldData: this.props.worldData,
      geo: geodecoder(countries.features)
    };
  },
  handleUsernameSubmit: function(username) {
    var _this = this;
    $.get('/api/users/' + username, function(res) {
      _this.setState({userCountryData: res.metadata.countrypercent});
    })
  },
  render: function () {
    return (
      <div>
        <WelcomeScreen onUsernameSubmit={this.handleUsernameSubmit} />
        <Globe geo={this.state.geo} worldData={this.state.worldData} userCountryData={this.state.userCountryData} />
      </div>
    )
  }
});
