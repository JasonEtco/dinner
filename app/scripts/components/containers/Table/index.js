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

  constructor(props) {
    super(props);
    this.renderTableSlices = this.renderTableSlices.bind(this);
  }

  renderTableSlices() {
    const { users, socket } = this.props;

    return Object.keys(users).map((key, i, arr) => {
      if (i > arr / 2) return false;

      return (
        <div className="table__table__slice">
          <div className="table__table__user">
            <User
              isMe={key === socket.id}
              key={key}
              id={key}
              name={users[key].name}
              prefix={users[key].prefix}
            />
          </div>
          <div className="table__table__slice__plate">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.08in" height="76.8" viewBox="0 0 77.71 57.33"><title>plate</title><circle cx="38.48" cy="28.67" r="28.67" fill="#e6e7e8"/><circle cx="38.48" cy="28.67" r="17.1" fill="#d1d3d4"/><path d="M0 47.84V9.57h2.17V19h2.16v11.6c0 8.02-1.94 17.24-4.33 17.24zM77.71 35.35v12.49h-1.5V37.29h-1v10.55h-1.5V37.29h-1v10.55h-1.5V37.29h-1.09v10.55h-1.5V35.26a5 5 0 0 1 1.3-3.26 4.12 4.12 0 0 1 2.45-1.16v-21h1.5v21A4.09 4.09 0 0 1 76.38 32a5.15 5.15 0 0 1 1.33 3.35z" fill="#d1d3d4"/></svg>
          </div>
        </div>
      );
    });
  }

  render() {
    const { rooms, socket } = this.props;

    return (
      <div className="table">
        <div className="table__table">
          {this.renderTableSlices()}
        </div>

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
      </div>
    );
  }
}
