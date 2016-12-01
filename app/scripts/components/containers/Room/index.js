import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { fireRef } from '../../../utils/store';
import './Room.scss';


export default class Room extends Component {
  static propTypes = {
    users: PropTypes.object,
    socket: PropTypes.object,
    rooms: PropTypes.array,
    currentRoom: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.renderChatLog = this.renderChatLog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleLeave() {
    const { currentRoom, socket } = this.props;

    fireRef.database().ref(`users/${socket.id}`).update({ currentRoom: 'none' });
    fireRef.database().ref(`rooms/${currentRoom}/users/${socket.id}`).remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { currentRoom, users, socket } = this.props;

    fireRef.database().ref(`rooms/${currentRoom}/log`).push({
      message: this.message.value,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: `${users[socket.id].prefix} ${users[socket.id].name}`,
      uid: socket.id,
    }).then(() => this.message.value = null);
  }

  renderChatLog() {
    const { rooms, currentRoom, socket } = this.props;
    if (!rooms[currentRoom]) return false;

    const log = rooms[currentRoom].log || [];

    return Object.keys(log).map(key =>
      <div className={`room__message ${log[key].uid === socket.id ? 'is-me' : ''}`} key={key}>
        <span className="room__message__message">{log[key].message}</span>
        <div className="room__message__meta">
          <span>{moment(log[key].timestamp).fromNow()}</span>
          <span>{log[key].user}</span>
        </div>
      </div>);
  }

  render() {
    return (
      <div className="room">
        <button className="room__leave" onClick={this.handleLeave}>Leave</button>
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
