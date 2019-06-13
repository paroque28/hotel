import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div style={styles.container}>
    <h1 >Home Page</h1>
    <p style={styles.description}>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '45%',
    resizeMode: 'contain',
    width: '45%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  description: {
    color: '#656500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
}