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

  state = { showMessage: false, giant: false }

  componentWillReceiveProps(props) {
    const { message } = this.props;
    if (props.message && message && props.message.timestamp !== message.timestamp) {
      console.log(props.message.timestamp - message.timestamp);
      this.setState({ showMessage: true, giant: props.message.timestamp - message.timestamp < 2000 });
    }
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ showMessage: false }), 4000);
  }

  render() {
    const { name, prefix, isMe, tooltip, message } = this.props;
    const { showMessage, giant } = this.state;

    return (
      <div className={`user ${isMe ? 'user--me' : ''} user--${h.slugify(prefix)}`}>
        {tooltip && <span className="user__tooltip">{prefix} {name}</span>}
        {(() => {
          if (tooltip && message && showMessage) {
            return (
              <CSS
                transitionName="grow-transition"
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component="div"
              >
                <div key={message.timestamp} className={`user__message ${giant ? 'user__message--giant' : ''}`}>
                  {message.message}
                </div>
              </CSS>
            );
          }

          return false;
        })()}
      </div>
    );
  }
}
