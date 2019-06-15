import React, {Component} from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const INITIAL_STATE = {
    titles: {},
    hotel: {}
  };


class SocialBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
      this.props.firebase.titles().then((obj) => {
        this.setState({"titles": obj[Object.keys(obj)[0]]});
      });
      this.props.firebase.hotel().then((obj) => {
        this.setState({"hotel": obj[Object.keys(obj)[0]]});
      });
    }
  
   
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {

      return (
        <div>
            <hr/>
      <ButtonGroup aria-label="Basic example">
        <Button href={this.state.hotel.twitter} variant="secondary">Twitter</Button>
        <Button href={this.state.hotel.instagram} variant="secondary">Instagram</Button>
        <Button href={this.state.hotel.facebook} variant="secondary">Facebook</Button>
      </ButtonGroup>
        </div>
          );
    }
  }



const Social 
 = compose(
  withFirebase,
)(SocialBase);

export default Social;