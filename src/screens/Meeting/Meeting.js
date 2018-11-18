import React from 'react';
import './Meeting.css';
import { Navbar, Dropdown, ResCards } from '../../components';
import firebase from '../../config/firebase';
import { checkUser, checkProfile } from '../../Helpers/Authchecker';
import swal from 'sweetalert2';
import Geofire from 'geofire';
import { Alert } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
// import Profile from '../Profile/Profile';

const auth = firebase.auth();
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});


class Meeting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            currUser: null,
            criteriaUsers: null
        }
        this.sendMeetingReq = this.sendMeetingReq.bind(this);
    }

    componentDidMount() {
        checkUser()
            .then(user => {
                this.setState({ currUser: user.uid })
                checkProfile(user)
                    .then(msg => {
                        toast({
                            type: 'warning',
                            title: msg
                        })
                        this.props.history.replace('/profile');
                    })
                    .catch(() => {

                        if (this.props.location.state) {

                            const { currentUser, allUsers } = this.props.location.state;
                            let criteriaUsers = allUsers.filter((values, index) => {
                                let distance = Geofire.distance(currentUser.location, values.location);
                                console.log(distance)
                                let beverages = currentUser.selectedBeverages.find(bev => values.selectedBeverages.find(bev2 => bev === bev2));
                                let duration = currentUser.selectedDuration.find(dur => values.selectedDuration.find(dur2 => dur === dur2));
                                if (distance <= 5 && beverages && duration) {
                                    let imagesArray = values.imageUrl.map(items => {
                                        return { original: items }
                                    })
                                    values.imagesArray = imagesArray;
                                    return values;
                                }
                            })
                            this.setState({ criteriaUsers, loader: false }, () => console.log(criteriaUsers));


                        }
                        else {
                            this.props.history.replace('/dashboard')
                        }
                    })

            })
            .catch(() => this.props.history.replace('/'))
    }

    sendMeetingReq(data) {
        this.props.history.push('/dashboard/meeting/location', { data })
    }



    render() {
        const { criteriaUsers, loader } = this.state;
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

                {loader && <div className="loader-div">
                    <Loader
                        type="Puff"
                        color="#FD5D62"
                    />
                </div>}

                {criteriaUsers && criteriaUsers.length === 0 &&
                    <div>
                        <div className="das-alert">
                            <Alert bsStyle="danger">Currently no one near to you is using this App <br /> Tell your friends about this Application.</Alert>
                        </div>
                    </div>
                }

                {
                    criteriaUsers && criteriaUsers.length > 0 &&
                    <div>
                        <div className="meet-heading-div">
                            Swap <span style={{ color: '#4CAF50' }}>Right</span> to Send a Request, <br />
                            Swap <span style={{ color: 'rgb(223, 1, 1)' }}>Left</span> to cancel. <br />
                            or use the buttons.
                        </div>
                        <ResCards criteriaUsers={criteriaUsers} sendMeetingReq={this.sendMeetingReq} />
                    </div>
                }




            </div>
        )

    }
}

export default Meeting;
