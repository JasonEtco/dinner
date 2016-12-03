import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { addMessage } from '../../../actions/roomActions';
import h from '../../../utils/helpers';
import './Room.scss';


export default class Room extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    handleLeaveRoom: PropTypes.func.isRequired,
    currentRoom: PropTypes.oneOfType([
      PropTypes.oneOf(['none']),
      PropTypes.number,
    ]).isRequired,
  }

  constructor(props) {
    super(props);
    this.renderChatLog = this.renderChatLog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.currentRoom === 'none') {
      this.message.value = null;
    } else {
      this.room.scrollTop = this.room.scrollHeight;
      this.message.focus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.message.value === '') return;

    const { currentRoom, dispatch } = this.props;
    dispatch(addMessage(this.message.value, currentRoom));
    this.message.value = null;
  }

  renderChatLog() {
    const { rooms, currentRoom, socket } = this.props;
    if (!rooms[currentRoom]) return false;

    const log = rooms[currentRoom].log || [];

    return Object.keys(log).map((key, i, arr) => {
      const classes = classnames(
        'room__message',
        { 'is-me': log[key].uid === socket.id },
        { 'is-same': arr[i + 1] && log[arr[i]].user === log[arr[i + 1]].user },
      );

      const { message, timestamp, user } = log[key];
      console.log(message, message.length);

      return (
        <div className={classes} key={key}>
          <span className={`room__message__message ${h.isEmoji(message) ? 'is-emoji' : ''}`}>{message}</span>
          <div className="room__message__meta">
            <span>{moment(timestamp).fromNow()}</span>
            <span>{user}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    const { currentRoom, handleLeaveRoom } = this.props;
    return (
      <div className="room" ref={(r) => { this.room = r; }}>
        <button className="room__leave" onClick={handleLeaveRoom} style={{ display: currentRoom === 'none' ? 'none' : null }}>Leave Room</button>
        <div className="room__chatlog">
          {this.renderChatLog()}
        </div>
        <form onSubmit={this.handleSubmit} className="room__form">
          <input type="text" name="message" placeholder="Write a message..." ref={(r) => { this.message = r; }} />
        </form>
      </div>
    );
  }
}
