/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var WelcomeScreen = require('./WelcomeScreen')
var Globe = require('./Globe')
var $ = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      worldData: this.props.worldData
    };
  },
  handleUsernameSubmit: function(username) {
    var _this = this;
    $.get('/api/users/' + username, function(res) {
      _this.setState({userCountryData: res.metadata.countrypercent});
    });
  },
  render: function () {
    return (
      <div>
        <WelcomeScreen onUsernameSubmit={this.handleUsernameSubmit} />
        <Globe worldData={this.state.worldData} userCountryData={this.state.userCountryData} />
      </div>
    )
  }
});
