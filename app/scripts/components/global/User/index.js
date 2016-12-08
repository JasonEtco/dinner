import React, { Component, PropTypes } from 'react';
import './User.scss';
import h from '../../../utils/helpers';

export default class User extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    isMe: PropTypes.bool.isRequired,
    tooltip: PropTypes.bool.isRequired,
  }

  render() {
    const { name, prefix, isMe, tooltip } = this.props;

    return (
      <div className={`user ${isMe ? 'user--me' : ''} user--${h.slugify(prefix)}`}>
        {tooltip && <span className="user__tooltip">{prefix} {name}</span>}
      </div>
    );
  }
}
