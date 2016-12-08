import React, { Component, PropTypes } from 'react';
import { joinRoom } from '../../../actions/roomActions';
import User from '../../global/User';
import './RoomTile.scss';

export default class RoomTile extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    roomUsers: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.enterRoom = this.enterRoom.bind(this);
  }

  enterRoom() {
    joinRoom(this.props.roomId, this.props.uid);
  }

  render() {
    const { roomUsers, users, uid } = this.props;

    if (roomUsers === undefined || roomUsers.length === 0) {
      return <button className="room-tile" onClick={this.enterRoom}>Empty!</button>;
    }

    const length = Object.keys(roomUsers).length;

    return (
      <button
        className={`room-tile room-tile--full room-tile--full--${length}`}
        onClick={this.enterRoom}
      >
        {Object.keys(roomUsers).map(key =>
          <User
            isMe={key === uid}
            key={key}
            id={key}
            name={users[key].name}
            prefix={users[key].prefix}
            tooltip={false}
          />)}
      </button>
    );
  }
}
