import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './css/noteHeader.css';

export default () => (
  <Jumbotron>
    <h1>Notes</h1>
    <p className="lead">Save your thoughts by whispering, wherever you are</p>
  </Jumbotron>
);
