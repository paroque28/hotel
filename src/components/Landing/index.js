import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
//import * as ROUTES from '../../constants/routes';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import Social from './social';

const Landing = () => (
  <div className="card">
      <HotelDescription/>
      <Card>
        <hr/>
        <ReactWeather
          forecast="5days"
          apikey="847d26c7fd2b47d691d234017191406"
          type="city"
          city="Sardinal"/>
      </Card>
      
    <Social/>
  </div>
);

const INITIAL_STATE = {
  titles: {},
  hotel: {},
  services: {},
  nearby: {},
  hotelImages: [],
  rooms: {}
};

class HotelDescriptionBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.props.firebase.hotel().then((obj) => {
      this.setState({"hotel": obj[Object.keys(obj)[0]]});
    });
    this.props.firebase.rooms().then((obj) => {
      this.setState({"rooms": obj});
      console.log(obj)
    });
    this.props.firebase.services().then((obj) => {
      this.setState({"services": obj});
      console.log(obj)
    });
    this.props.firebase.nearby().then((obj) => {
      this.setState({"nearby": obj});
    });
    this.props.firebase.titles().then((obj) => {
      this.setState({"titles": obj[Object.keys(obj)[0]]});
    });
  }

 

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const servicesList = this.state.services;
    const services = Object.keys(this.state.services).map(function(key) {
      return(<Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                 {servicesList[key].name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{servicesList[key].description}
                <p>
                {servicesList[key].phoneNumber}
                </p>
                </Card.Body>
                
              </Accordion.Collapse>
            
            </Card>
      );
    });
    const nearbyList = this.state.nearby;
    const nearby = Object.keys(this.state.nearby).map(function(key) {
      return(<Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                 {nearbyList[key].name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{nearbyList[key].description}
                <p>
                {nearbyList[key].phoneNumber}
                </p>
                </Card.Body>
                
              </Accordion.Collapse>
            
            </Card>
      );
    });
    const roomsList = this.state.rooms;
    const rooms = Object.keys(this.state.rooms).map(function(key) {
      return(<div>
              <h5>{roomsList[key].name}</h5>
              <br></br>
              <p>Capacity: {roomsList[key].capacity}</p>
              <p>Beds: {roomsList[key].beds}</p>
              <p>Price: {roomsList[key].price}</p>
            </div>
      );
    });
    return (
      <div className="container">
        <h1 className="display-4 ">{this.state.hotel.name}</h1>
        <p className="lead">{this.state.hotel.description}</p>
        <br/>
        <HotelCarousel/>
        <br/>
        <div className="container">
          
          <h4 className="">{this.state.titles.services}</h4>
          <Accordion>
            {services}
          </Accordion>
          <h4 className="">{this.state.titles.nearby}</h4>
          <Accordion>
            {nearby}
          </Accordion>
          <br/>
          <h3 className="">{this.state.titles.rooms}</h3>
          {rooms}
        </div>
      </div>
        );
  }
}




class HotelCarouselBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.props.firebase.hotel().then((obj) => {
      for (var image of obj[Object.keys(obj)[0]].images){
        this.props.firebase.getURL({ fileId: image.image[0].id }).then((url) => {
          this.setState({"hotelImages":[url, ...this.state.hotelImages]})
        });
      }
      
    });
    this.props.firebase.titles().then((obj) => {
      this.setState({"titles": obj[Object.keys(obj)[0]]});
    });
  }

 

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    var images = this.state.hotelImages.map(function(item) {
			return (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={item}
            alt="Hotel"
          />
        </Carousel.Item>
			);
    });
    return (
      
      <div>
      <h3 className="">{this.state.titles.gallery}</h3>
      <Carousel>
        {images}
      </Carousel></div>
        );
  }
}

const HotelCarousel 
 = compose(
  withFirebase,
)(HotelCarouselBase);

const HotelDescription 
 = compose(
  withRouter,
  withFirebase,
)(HotelDescriptionBase);

export default Landing;

export { HotelDescription };
