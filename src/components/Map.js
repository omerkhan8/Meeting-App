import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class Map extends React.Component {


    constructor() {
        super();
        this.state = {
            coords: null
        };
        this.getCurrPosition = this.getCurrPosition.bind(this);
    }

    componentDidMount() {
        this.setPosition();
    }



    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords });
        })
    }

    getCurrPosition({ latitude, longitude }) {
        // console.log(lat, lng);
        this.setState({ coords: { latitude, longitude } })
    }

    submit() {
        const { coords } = this.state;
        let location = {
            longitude: coords.longitude,
            latitude: coords.latitude
        }
        this.props.mapNext(location);
    }


    render() {
        const { coords } = this.state;
        console.log(this.state)
        return (
            <div>
                <div className="det-heading-div"><li> Please confirm your location, if not correct drag the marker to the correct location. </li></div>
                {coords && <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `60vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coords={coords}
                    getCurrentPosition={this.getCurrPosition}
                />}
                <br />
                <div>
                    <div className="pf-next-btn" onClick={() => this.submit()}>
                        Submit
                    </div>
                </div>
            </div>
        )
    }
}




const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={18}
        // defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            draggable={true}
            onDragEnd={position => {
                // console.log(position.latLng.lat(), position.latLng.lng());
                props.getCurrentPosition({ latitude: position.latLng.lat(), longitude: position.latLng.lng() });
            }} />}
    </GoogleMap>
))



export default Map;