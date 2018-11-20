/* eslint-disable no-undef */
/* global google */

import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps";
import { Button } from 'react-bootstrap';

class Direction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: "",
            directions: null
        }
        this.getDirections = this.getDirections.bind(this)
    }

    getDirections() {
        const { userLocation, placeLocation } = this.props
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(userLocation[0], userLocation[1]),
            destination: new google.maps.LatLng(placeLocation[0], placeLocation[1]),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                this.setState({
                    error: "Sorry! Can't calculate directions!"
                })
            }
        });
    }

    render() {
        const { directions, error } = this.state;
        const { userLocation, placeLocation } = this.props;
        // console.log("userLocation", userLocation)
        // console.log("pleaceLocation", placeLocation)
        // console.log('workkkkkk')

        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8y5qF5IzUOkjG0PB-y7Edc8ykUid6jSg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    userLocation={userLocation}
                    placeLocation={placeLocation}
                />
                <br />
                <Button bsStyle="primary" onClick={this.getDirections}>Get Directions</Button>
                <br/>
                <Button style={{marginTop:'5px'}} onClick={this.props.handleClose}>Close</Button>

            </div>
        )

    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={13}
        center={{ lat: props.userLocation[0], lng: props.userLocation[1] }}
    >

        <Marker position={{ lat: props.userLocation[0], lng: props.userLocation[1] }} />
        <Marker position={{ lat: props.placeLocation[0], lng: props.placeLocation[1] }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))


export default Direction;