import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { fireRef } from '../../../utils/store';
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
    const { roomId, uid } = this.props;
    fireRef.database().ref(`rooms/${roomId}/users/${uid}`).set({ joined: firebase.database.ServerValue.TIMESTAMP });
    fireRef.database().ref(`users/${uid}`).update({ currentRoom: parseInt(roomId, 10) });
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
