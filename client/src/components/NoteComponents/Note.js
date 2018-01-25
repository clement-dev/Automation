import React from 'react';
import { ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Ionicon from 'react-ionicons';
import './css/note.css';

export default props => (
  <div className="list-group-item">
    <div className="list-group-item-heading">
      <ButtonToolbar className="pull-right">
        <ButtonGroup>
          <Ionicon
            icon={props.note.pinned ? 'ios-bookmarks' : 'ios-bookmarks-outline'}
            fontSize="25px"
            color={props.note.pinned ? '#02588C' : ''}
            onClick={e => props.handlePin(e, props.note.id)}
          />
        </ButtonGroup>
        <ButtonGroup>
          <Ionicon
            icon="ios-trash-outline"
            fontSize="25px"
            color="#FF5349"
            onClick={e => props.handleDelete(e, props.note.id)}
          />
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <p
      className="list-group-item-text"
      onClick={e => props.handleExpanded(e, props.note.id)}>
      {props.expandedNotes.includes(props.note.id) ||
      100 >= props.note.text.length
        ? props.note.text
        : `${props.note.text.substr(0, 100)}...`}
    </p>
  </div>
);
