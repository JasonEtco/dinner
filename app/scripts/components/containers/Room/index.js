import React, { Component, PropTypes } from 'react';

class Room extends Component {
  render() {
    return (
      <div>Chat with me</div>
    );
  }
}

Room.propTypes = {
  example: PropTypes.string,
};

export default Room;
