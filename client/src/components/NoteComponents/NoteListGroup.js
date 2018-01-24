import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import './css/noteListGroup.css';

export default props => (
  <div className="list-group">
    {props.notes.map(note => {
      return (
        <div key={note.id} className="list-group-item">
          <div className="list-group-item-heading">
            <ButtonToolbar className="pull-right" style={{ zIndex: 1000 }}>
              <ButtonGroup>
                <Button
                  bsStyle={note.pinned ? 'primary' : 'default'}
                  onClick={e => props.handlePin(e, note.id)}>
                  <Glyphicon glyph="pushpin" />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  bsStyle="danger"
                  onClick={e => props.handleDelete(e, note.id)}>
                  <Glyphicon glyph="trash" />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <p
            className="list-group-item-text"
            onClick={e => props.handleExpanded(e, note.id)}>
            {props.expandedNotes.includes(note.id) || 100 >= note.text.length
              ? note.text
              : `${note.text.substr(0, 100)}...`}
          </p>
        </div>
      );
    })}
  </div>
);
