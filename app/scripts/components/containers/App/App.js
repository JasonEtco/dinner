/*
  eslint
  react/no-unescaped-entities: 0,
  react/style-prop-object: 0
  jsx-a11y/no-static-element-interactions: 0
*/

import React, { Component, PropTypes } from 'react';
import h from '../../../utils/helpers';
import { fireRef } from '../../../utils/store';
import './App.scss';
import { getRooms, leaveRoom } from '../../../actions/roomActions';
import { getUsers } from '../../../actions/userActions';
import { me, popUpMessage } from '../../../actions/generalActions';
import Input from '../../global/Input';
import Button from '../../global/Button';
import Loader from '../../global/Loader';
import Room from '../Room';
import RoomTile from '../RoomTile';
import Table from '../Table';

export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    general: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { disabled: false };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getRooms());
    dispatch(getUsers());
  }

  componentDidMount() {
    const { socket, dispatch } = this.props;
    socket.on('message', msgObj => dispatch(popUpMessage(msgObj)));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.props.socket;

    const obj = {
      joined: Date.now(),
      currentRoom: 'none',
      name: this.name.name.value,
      prefix: h.getUrlParameter('prefix') || h.rando(Object.keys(h.prefixes)),
    };

    this.setState({ disabled: true });

    fireRef.database().ref(`users/${id}`).set(obj).then(() => dispatch(me(obj)));
  }

  render() {
    const { users, socket, rooms, general, dispatch } = this.props;
    const maxPeople = 6;
    const observer = Object.keys(users).length >= maxPeople && !users[socket.id];

    if (general.isFetching) {
      return (
        <div className="app loading">
          <Loader />
          <h1>Loading</h1>
        </div>
      );
    }

    if (!users[socket.id] && !observer) {
      return (
        <div className="app">
          <form className="app__welcome" onSubmit={this.handleSubmit}>
            <h1>Welcome to Thanksgiving Dinner! What's your name again?</h1>
            <Input
              autofocus
              required
              max={12}
              name="name"
              label="Your name"
              placeholder="John Smith"
              ref={(r) => { this.name = r; }}
              disabled={this.state.disabled}
            />
            <Button text="Go take a seat" style="card--dark" type="submit" />
          </form>
        </div>
      );
    }

    if (observer) {
      return (
        <div>
          <h1
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
            }}
          >The table's full but you can hang around!</h1>

          <Table {...this.props} inConvo={false} />
        </div>
      );
    }

    const { name, prefix, currentRoom } = users[socket.id];

    return (
      <div>
        <h1
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
          }}
        >Hi there {prefix} {name}!</h1>

        <div className="rooms">
          {Object.keys(rooms).map(key =>
            <RoomTile
              uid={socket.id}
              key={key}
              rooms={rooms}
              roomUsers={rooms[key].users}
              users={users}
              roomId={key}
            />)}
        </div>

        <Table {...this.props} inConvo={currentRoom !== 'none'} />

        <Room
          {...this.props}
          inRoom={currentRoom !== 'none'}
          currentRoom={isNaN(currentRoom) ? currentRoom : parseInt(currentRoom, 10)}
          ref={(r) => { this.room = r; }}
        />

        <div className={`overlay ${currentRoom !== 'none' ? 'is-active' : ''}`} onClick={() => dispatch(leaveRoom())} />
      </div>
    );
  }
}
