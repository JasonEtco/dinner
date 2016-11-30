import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './Table.scss';

class Table extends Component {
  render() {
    return (
      <div className="table">
        <Link to="room/0" className="table__user" key={0} />
        <div className="table__table" />
      </div>
    );
  }
}

Table.propTypes = {
  example: PropTypes.string,
};

export default Table;
