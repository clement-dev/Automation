import React from 'react';
import NoteItem from './NoteItem';
import './css/noteTable.css';

export default props => (
  <div className="container">
    <div className="col-lg-offset-3 col-lg-6">
      <div className="list-group">
        {props.notes.map(
          note =>
            note.isPinned && (
              <NoteItem
                key={note.id}
                note={note}
                expandedNotes={props.expandedNotes}
                handlePin={props.handlePin}
                handleDelete={props.handleDelete}
                handleExpanded={props.handleExpanded}
              />
            ),
        )}
      </div>
      <div className="list-group space-footer">
        {props.notes.map(
          note =>
            !note.isPinned && (
              <NoteItem
                key={note.id}
                note={note}
                expandedNotes={props.expandedNotes}
                handlePin={props.handlePin}
                handleDelete={props.handleDelete}
                handleExpanded={props.handleExpanded}
              />
            ),
        )}
      </div>
    </div>
  </div>
);
