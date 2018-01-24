import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { emitEvent } from '../../utils/merryhome-api';
import './css/InputItem.css';

class InputItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  InputTypeItem() {
    if ('button' === this.props.type) {
      const title = this.props.icon ? (
        <Glyphicon glyph={this.props.icon} />
      ) : (
        <span>{this.props.title}</span>
      );
      return (
        <button
          className="btn btn-default InputItemButton"
          onClick={this.handleClick.bind(this)}>
          {title}
        </button>
      );
    }

    if ('range' === this.props.type) {
      return (
        <div className="InputItemRange">
          <input
            type={this.props.type}
            id={this.props.itemId}
            min="0"
            max="50"
            onChange={this.handleChange.bind(this)}
            value={this.state.value}
          />
          <span>{this.state.value}</span>
        </div>
      );
    }

    return (
      <input
        type={this.props.type}
        id={this.props.itemId}
        value={this.state.value}
      />
    );
  }

  handleClick(e) {
    emitEvent(this.props.apiEvent, { id: this.props.itemId });
  }

  handleChange(e) {
    emitEvent(this.props.apiEvent, {
      id: this.props.itemId,
      value: e.target.value,
    });
    this.setState({ value: e.target.value });
  }

  render() {
    const InputTypeItem = this.InputTypeItem.bind(this);
    return <InputTypeItem />;
  }
}

export default InputItem;
