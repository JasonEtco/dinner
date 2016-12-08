import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import './Message.scss';
import h from '../../../utils/helpers';

export default class Message extends Component {
  static propTypes = {
    isMe: PropTypes.bool.isRequired,
    isSame: PropTypes.bool.isRequired,
    isEmoji: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
  }

  render() {
    const { isMe, isSame, isEmoji, timestamp, user, message, prefix } = this.props;

    const classes = classnames(
        'room__message',
        `room__message--${h.slugify(prefix)}`,
        { 'is-me': isMe },
        { 'is-same': isSame },
        { 'is-emoji': isEmoji },
    );

    return (
      <div className={classes}>
        <span className="room__message__message">{message}</span>
        {!isSame && <div className="room__message__meta">
          <span>{moment(timestamp).fromNow()}</span>
          <span>{user}</span>
        </div>}
      </div>
    );
  }
}
