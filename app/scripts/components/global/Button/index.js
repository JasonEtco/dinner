import React, { Component, PropTypes } from 'react';
import './Button.scss';

class Button extends Component {
  render() {
    const { type, style, text, onClick, children } = this.props;
    const className = style ? `btn btn--${style}` : 'btn';
    return (
      <button type={type} className={className} onClick={type === 'submit' ? onClick : f => f}>{children || text}</button>
    );
  }
}

Button.propTypes = {
  style: PropTypes.oneOf(['yes', 'no', 'card', 'card--dark']),
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.object,
};

export default Button;
