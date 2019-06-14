import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Button from 'react-bootstrap/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <div className="card">
      <h4 className="card-title mb-4 mt-1">Landing</h4>
      <LandingForm 
       />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LandingFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    // const products = this.props.flamelink.flamelink.content.get({ schemaKey: 'products' })
    // console.log('All of your products:', products)

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          className="form-control"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          className="form-control"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit" className="float-right btn btn-outline-primary">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const LandingForm 
 = compose(
  withRouter,
  withFirebase,
)(LandingFormBase);


export default Landing;

export { LandingForm };
