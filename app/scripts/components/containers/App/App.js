import React, { Component, PropTypes } from 'react';
import h from '../../../utils/helpers';
import { fireRef } from '../../../utils/store';
import './App.scss';
import { getRooms } from '../../../actions/roomActions';
import { getUsers } from '../../../actions/userActions';
import { me } from '../../../actions/generalActions';
import Input from '../../global/Input';
import Button from '../../global/Button';
import Room from '../Room';
import Table from '../Table';

export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loading: true };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getRooms());
    dispatch(getUsers());
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.props.socket;

    const obj = {
      joined: Date.now(),
      currentRoom: 'none',
      name: this.name.name.value,
      prefix: h.rando(h.prefixes),
    };

    fireRef.database().ref(`users/${id}`).set(obj).then(() => dispatch(me(obj)));
  }

  render() {
    const { users, socket } = this.props;

    if (!users[socket.id]) {
      return (
        <div className="app">
          <form className="app__welcome" onSubmit={this.handleSubmit}>
            <h1>Welcome to Thanksgiving Dinner! What's your name again?</h1>
            <Input autofocus required name="name" label="Your name" placeholder="John Smith" ref={(r) => { this.name = r; }} />
            <Button text="Go take a seat" style="card--dark" type="submit" />
          </form>
        </div>
      );
    }

    const { name, prefix, currentRoom } = users[socket.id];

    return (
      <div style={{ height: '100%' }}>
        <h1>Hi there {prefix} {name}!</h1>
        <Table {...this.props} />
        <div className={`room-wrapper ${currentRoom !== 'none' ? 'in-room' : ''}`}>
          <Room {...this.props} currentRoom={parseInt(currentRoom, 10)} />
        </div>
      </div>
    );
  }
}
