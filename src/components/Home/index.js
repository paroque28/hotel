import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import Messages from '../Messages';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  titles: {},
};

class HomePageBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.props.firebase.titles().then((obj) => {
      this.setState({"titles": obj[Object.keys(obj)[0]]});
    });
  }

 

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return(
    <div >
    <h1>{this.state.titles.reviews}</h1>
      <Messages />
    </div>
  )
  }
}


const condition = authUser => !!authUser;

const HomePage
 = compose(
  withFirebase,
  withAuthorization(condition),
)(HomePageBase);

export default HomePage;