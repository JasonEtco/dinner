import React, { Component, PropTypes } from 'react';
import './User.scss';

export default class User extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    isMe: PropTypes.bool.isRequired,
  }

  render() {
    const { id, name, prefix, isMe } = this.props;

    return (
      <div className={`user ${isMe ? 'user--me' : ''}`}>
        <span className="user__tooltip">{prefix} {name}</span>
      </div>
    );
  }
}
