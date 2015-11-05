/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.refs.username.value.trim();
    if (!username) {
      return;
    }
    this.props.onUsernameSubmit(username);
    return;
  },
  render: function () {
    return (
      <div id="welcome">
        <form id="form" onSubmit={this.handleSubmit}>
          <h1>Sprinkle the world with <span className="your">your</span> music.</h1>
          <input id="nickInput" type="text" ref="username" placeholder="last.fm username" autoComplete="off" autofocus />
        </form>
      </div>
    )
  }
});
