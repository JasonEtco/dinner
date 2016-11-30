import React, { Component, PropTypes } from 'react';
import h from '../../../utils/helpers';
import { fireRef } from '../../../utils/store';
import './App.scss';
import { getRooms } from '../../../actions/roomActions';
import { getUsers } from '../../../actions/userActions';
import { me } from '../../../actions/generalActions';
import User from '../../global/User';

class App extends Component {
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
      name: this.name.value,
      prefix: h.rando(h.prefixes),
    };

    fireRef.database().ref(`users/${id}`).set(obj).then(() => dispatch(me(obj)));
  }

  render() {
    const { users, general, socket } = this.props;
    const { name, prefix } = general;

    if (!name) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(r) => { this.name = r; }} />
        </form>
      );
    }

    return (
      <div style={{ height: '100%' }}>
        <h1>Hi there {prefix} {name}!</h1>

        {Object.keys(users).map(key =>
          <User
            isMe={key === socket.id}
            key={key}
            id={key}
            name={users[key].name}
            prefix={users[key].prefix}
          />)}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  general: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};

export default App;
