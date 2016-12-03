import React, { Component, PropTypes } from 'react';
import './EmojiPicker.scss';
import emojis from './emojis';

class EmojiPicker extends Component {
  constructor(props) {
    super(props);
    this.setEmoji = this.setEmoji.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.renderEmojis = this.renderEmojis.bind(this);

    this.state = { isOpen: false, emoji: null, search: '' };
  }

  componentDidMount() { window.addEventListener('click', this.hidePicker); }
  componentWillUnmount() { window.removeEventListener('click', this.hidePicker); }

  setEmoji(emoji) {
    if (this.props.onClick) {
      this.props.onClick(emoji);
      this.hidePicker();
    } else {
      this.setState({ emoji });
    }
  }

  togglePicker(e) {
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
    this.search.focus();
  }

  hidePicker() {
    this.setState({ isOpen: false });
    this.search.blur();
  }

  updateSearch() {
    this.setState({ search: this.search.value });
  }

  renderEmojis() {
    const { search, emoji } = this.state;

    let results = Object.keys(emojis);
    if (search !== '') {
      results = Object.keys(emojis).filter((key) => {
        const re = new RegExp(search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
        return key.search(re) > -1;
      });
    }

    return results.map(e =>
      <li className={`emj__emoji ${emoji === emojis[e] ? 'is-active' : ''}`} key={e}>
        <button type="button" onClick={() => this.setEmoji(emojis[e])}>{emojis[e]}</button>
      </li>);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className="emj">
        <button type="button" className="emj__btn" onClick={this.togglePicker}>😁</button>
        <div className={`emj__wrapper ${isOpen ? 'is-open' : ''}`} onClick={e => e.stopPropagation()}>
          <input
            onChange={this.updateSearch}
            type="text"
            className="emj__search"
            ref={(r) => { this.search = r; }}
            name="emj"
          />
          <ul className="emj__list">
            {this.renderEmojis()}
          </ul>
        </div>
      </div>
    );
  }
}

EmojiPicker.propTypes = {
  onClick: PropTypes.func,
};

export default EmojiPicker;
