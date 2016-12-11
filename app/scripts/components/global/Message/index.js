import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import './Message.scss';
import h from '../../../utils/helpers';

export default class Message extends Component {
  static propTypes = {
    isMe: PropTypes.bool.isRequired,
    isSame: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    prefix: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
  }

  render() {
    const { isMe, isSame, timestamp, user, messages, prefix, log } = this.props;
    const arr = Object.keys(log);

    const classes = classnames(
        'message',
        `message--${h.slugify(prefix)}`,
        { 'is-me': isMe },
        { 'is-same': isSame },
    );

    return (
      <div className={classes}>
        <div className="message__messages">
          {messages.map((m, i) => {
            const msg = arr.length > 1 && log[m] !== undefined ? log[m].message : m;
            return <span key={i} className={`message__message ${h.isEmoji(msg) ? 'is-emoji' : ''}`}>{msg}</span>;
          })}
        </div>
        {!isSame && <div className="message__meta">
          <span>{moment(timestamp).fromNow()}</span>
          <span>{user}</span>
        </div>}
      </div>
    );
  }
}
