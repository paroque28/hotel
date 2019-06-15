import React from 'react';

import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';


const SignOutButton = ({ firebase }) => (
  <Button variant="outline-light" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
