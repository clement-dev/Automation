import React from 'react';
import { emitEvent } from '../../utils/merryhome-api';
import './css/MediaItem.css';

class MediaItem extends React.Component {
  handleClick(e) {
    emitEvent(this.props.apiEvent, {
      id: this.props.itemId,
      title: this.props.title,
      file: this.props.file,
    });
  }

  render() {
    return (
      <button
        className="btn btn-default mediaItem"
        type="button"
        onClick={this.handleClick.bind(this)}>
        <span>{this.props.title}</span>
      </button>
    );
  }
}

export default MediaItem;
