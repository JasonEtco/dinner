import React, { Component, PropTypes } from 'react';
import { joinRoom } from '../../../actions/roomActions';
import './RoomTile.scss';

export default class RoomTile extends Component {
  static propTypes = {
    uid: PropTypes.string,
    roomId: PropTypes.string,
    users: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.enterRoom = this.enterRoom.bind(this);
  }

  enterRoom() {
    joinRoom(this.props.roomId, this.props.uid);
  }

  render() {
    const { users } = this.props;

    return (
      <button className="room-tile" onClick={this.enterRoom}>
        <span>{users ? Object.keys(users).length : 0}</span>
      </button>
    );
  }
}
