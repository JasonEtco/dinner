import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { addMessage, leaveRoom } from '../../../actions/roomActions';
import h from '../../../utils/helpers';
import './Room.scss';
import EmojiPicker from '../../global/EmojiPicker';


export default class Room extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    currentRoom: PropTypes.oneOfType([
      PropTypes.oneOf(['none']),
      PropTypes.number,
    ]).isRequired,
  }

  constructor(props) {
    super(props);
    this.renderChatLog = this.renderChatLog.bind(this);
    this.handleEmojiPick = this.handleEmojiPick.bind(this);
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

  handleEmojiPick(str) {
    this.message.value = this.message.value + str;
    this.message.focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.message.value === '' || !/\S/.test(this.message.value)) return;

    const { currentRoom, dispatch } = this.props;
    dispatch(addMessage(this.message.value, currentRoom));
    this.message.value = null;
  }

  renderChatLog() {
    const { rooms, currentRoom, socket } = this.props;
    if (!rooms[currentRoom]) return false;

    const log = rooms[currentRoom].log || [];

    return Object.keys(log).map((key, i, arr) => {
      const { message, timestamp, user } = log[key];
      const classes = classnames(
        'room__message',
        { 'is-me': log[key].uid === socket.id },
        { 'is-same': arr[i + 1] && log[arr[i]].user === log[arr[i + 1]].user },
        { 'is-emoji': h.isEmoji(message) },
      );

      return (
        <div className={classes} key={key}>
          <span className="room__message__message">{message}</span>
          <div className="room__message__meta">
            <span>{moment(timestamp).fromNow()}</span>
            <span>{user}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    const { currentRoom, dispatch } = this.props;
    return (
      <div className="room" ref={(r) => { this.room = r; }}>
        <button className="room__leave" onClick={() => dispatch(leaveRoom())} style={{ display: currentRoom === 'none' ? 'none' : null }}>Leave Room</button>
        <div className="room__chatlog">
          {this.renderChatLog()}
        </div>

        <div className="room__form-wrapper">
          <form onSubmit={this.handleSubmit} className="room__form">
            <input type="text" name="message" placeholder="Write a message..." ref={(r) => { this.message = r; }} />
          </form>
          <EmojiPicker onClick={this.handleEmojiPick} />
        </div>
      </div>
    );
  }
}
