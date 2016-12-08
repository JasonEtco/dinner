import React, { Component, PropTypes } from 'react';
import { addMessage, leaveRoom } from '../../../actions/roomActions';
import h from '../../../utils/helpers';
import './Room.scss';
import Message from '../../global/Message';
import EmojiPicker from '../../global/EmojiPicker';


export default class Room extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    inRoom: PropTypes.bool.isRequired,
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
      const { message, timestamp, user, uid, prefix } = log[key];
      const isSame = arr[i + 1] !== undefined && log[arr[i]].uid === log[arr[i + 1]].uid;

      return (
        <Message
          key={key}
          isMe={uid === socket.id}
          isSame={isSame}
          isEmoji={h.isEmoji(message)}
          timestamp={timestamp}
          user={user}
          prefix={prefix}
          message={message}
        />
      );
    });
  }

  render() {
    const { currentRoom, inRoom, dispatch } = this.props;
    return (
      <div className={`room-wrapper ${inRoom && 'in-room'}`}>
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
      </div>
    );
  }
}
