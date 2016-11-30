import React, { PropTypes } from 'react';
import './Loader.scss';

const Loader = props =>
  (
    <div className={`loader ${props.center ? 'loader--center' : ''}`}>
      <h1>Loading!</h1>
    </div>
  );

Loader.propTypes = {
  center: PropTypes.bool,
};

export default Loader;
