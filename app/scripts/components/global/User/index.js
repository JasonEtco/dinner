import React, { Component, PropTypes } from 'react';
import CSS from 'react-addons-css-transition-group';
import './User.scss';
import h from '../../../utils/helpers';

export default class User extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    message: PropTypes.object,
    isMe: PropTypes.bool.isRequired,
    tooltip: PropTypes.bool.isRequired,
  }

  state = { showMessage: false }

  componentWillReceiveProps(props) {
    if (props.message && this.props.message && props.message.timestamp !== this.props.message.timestamp) {
      clearTimeout(this.timer);
      this.setState({ showMessage: true });
    }

    this.timer = setTimeout(() => this.setState({ showMessage: false }), 4000);
  }

  render() {
    const { name, prefix, isMe, tooltip, message } = this.props;
    const { showMessage } = this.state;

    return (
      <div className={`user ${isMe ? 'user--me' : ''} user--${h.slugify(prefix)}`}>
        {tooltip && <span className="user__tooltip">{prefix} {name}</span>}
        {(() => {
          if (tooltip && message && showMessage) {
            return (
              <CSS
                transitionName="grow-transition"
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}
                className="user__message"
              ><span key={message.timestamp || Date.now()}>{message.message || ''}</span></CSS>
            );
          }

          return false;
        })()}
      </div>
    );
  }
}
