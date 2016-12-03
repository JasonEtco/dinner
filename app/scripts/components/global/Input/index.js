import React, { Component, PropTypes } from 'react';
import './Input.scss';

class Input extends Component {
  render() {
    const { name, placeholder, label, full, autofocus, required, max } = this.props;

    return (
      <div className={`input ${full ? 'input--full' : ''}`}>
        <label className="input__label" htmlFor={`inp-${name}`}>{label}</label>
        <input
          type="text"
          maxLength={max}
          className="input__input"
          id={`inp-${name}`}
          placeholder={placeholder}
          ref={(r) => { this[name] = r; }}
          required={required}
          autoFocus={autofocus}
        />
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  full: PropTypes.bool,
  autofocus: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  max: PropTypes.number,
};

export default Input;
