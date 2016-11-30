import React, { Component, PropTypes } from 'react';
import './Button.scss';

class Button extends Component {
  render() {
    const { type, text, onClick, children } = this.props;
    const className = type ? `btn btn--${type}` : 'btn';
    return (
      <button className={className} onClick={onClick}>{children || text}</button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['yes', 'no', 'card']),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object,
};

export default Button;
