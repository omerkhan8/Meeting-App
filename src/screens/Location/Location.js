import React from 'react';
import './Location.css';
import { Navbar, Dropdown } from '../../components';
import { checkUser } from '../../Helpers/Authchecker';
import Loader from 'react-loader-spinner';
import { FormGroup, FormControl, Button } from 'react-bootstrap';


const CLIENT_ID = 'ADP2LPQPGPOF2RMVGYEEBSBLS2UI5OG3VJZ13HKIP211ZZXQ';
const CLIENT_SECRET = 'TVBEZAFUFD2JF0BHE0AWBCNRSKLMUKLQUBS1FFVGXM5EIUNM';

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currUser: null,
            loader: true,
            nearByPlaces: null
        }
    }

    componentDidMount() {
        checkUser()
            .then(user => {
                this.setState({ currUser: user.uid })
                if (!this.props.location.state) {
                    this.props.history.replace('/dashboard')
                }
                else {
                    const { data } = this.props.location.state;
                    const { location } = data
                    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=3&ll=${location[0]},${location[1]}&sortByDistance=1`)
                        .then(res => res.json())
                        .then(result => {
                            let resData = result.response.groups[0].items;
                            let arr = [];
                            for (let d of resData) {
                                arr.push(d.venue)
                            }
                            console.log('finallllll', arr);
                            this.setState({ nearByPlaces: arr, loader: false })
                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => this.props.history.replace('/'))
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        const { loader, nearByPlaces } = this.state;
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

                {loader && <div className="loader-div">
                    <Loader
                        type="Triangle"
                        color="#FD5D62"
                    />
                </div>}

                {nearByPlaces &&
                    <div>
                        <div className="loc-first-div">
                            Please select location to meet!
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div className="loc-search-div">
                                <FormGroup bsSize="large">
                                    <FormControl type="text" placeholder="Search..." />
                                </FormGroup>
                            </div>
                            <div className="loc-search-btn">
                                <i className="fa fa-search" style={{ color: 'white', fontSize: '25px' }} ></i>
                            </div>
                        </div>
                        <div className="get-start-div">
                            <p id="places-para">Near by places</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: "90%" }}></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nearByPlaces.map((places, index) => {
                                        return (
                                            <tr key={places.id}>
                                                <td>
                                                    <div>
                                                        <div className="loc-location-div">
                                                            <i className="fa fa-map-marker" style={{ color: 'white', fontSize: '20px' }} ></i>
                                                        </div>
                                                        <span style={{position:'relative',top:'5px',left:'5px'}}>
                                                            <p className="loc-para1">
                                                                {places.name}
                                                            </p>
                                                            <p className="loc-para1">
                                                                {`${places.location.address}(${places.location.distance}m)`}
                                                            </p>
                                                        </span>
                                                    </div>



                                                </td>
                                                <td><Button bsStyle="primary">map</Button></td>
                                                <td><Button bsStyle="info">select</Button></td>
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Location;