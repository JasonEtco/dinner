import React, { Component, PropTypes } from 'react';
import './Input.scss';

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    full: PropTypes.bool,
    autofocus: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    max: PropTypes.number,
  };

  render() {
    const { name, placeholder, label, full, autofocus, required, max, disabled } = this.props;

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
          disabled={disabled}
        />
      </div>
    );
  }
}
