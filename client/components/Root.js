/** @jsx React.DOM */

var React = require('react');
var ReactDom = require('react-dom')
var WelcomeScreen = require('./WelcomeScreen')
var Globe = require('./Globe')
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  getInitialState: function() {
    return {}
  },
  handleUsernameSubmit: function(username) {
    var _this = this;
    $.get('/api/users/' + username, function(res) {
      _this.setState({userCountryData: res.metadata.countrypercent});
    });
  },
  render: function () {
    var welcomeScreen = !this.state.userCountryData ? <WelcomeScreen onUsernameSubmit={this.handleUsernameSubmit} /> : '';
    return (
      <div>
        <ReactCSSTransitionGroup transitionAppearTimeout={1000} transitionAppear={true} transitionName="fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {welcomeScreen}
        </ReactCSSTransitionGroup>
        <Globe userCountryData={this.state.userCountryData} />
      </div>
    )
  }
});
