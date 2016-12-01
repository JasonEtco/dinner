import React, { Component, PropTypes } from 'react';
import './Table.scss';
import User from '../../global/User/';
import RoomTile from '../RoomTile';

export default class Table extends Component {
  static propTypes = {
    users: PropTypes.object,
    rooms: PropTypes.array,
    socket: PropTypes.object,
  }

  render() {
    const { rooms, users, socket } = this.props;

    return (
      <div className="table">
        <div className="table__table" />

        <div className="table__rooms">
          {Object.keys(rooms).map(key =>
            <RoomTile
              uid={socket.id}
              key={key}
              rooms={rooms}
              users={rooms[key].users}
              roomId={key}
            />)}
        </div>

        <div className="table__users">
          {Object.keys(users).map(key =>
            <User
              isMe={key === socket.id}
              key={key}
              id={key}
              name={users[key].name}
              prefix={users[key].prefix}
            />)}
        </div>
      </div>
    );
  }
}
