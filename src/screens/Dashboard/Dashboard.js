import React from 'react';
import './Dashboard.css'
import { checkUser, checkProfile } from '../../Helpers/Authchecker';
import { Navbar, Dropdown, MeetingList, Popup } from '../../components';
import firebase from '../../config/firebase';
import Loader from 'react-loader-spinner';
import { Alert } from 'react-bootstrap';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { saveUser } from './Actions/DashboardActions';

const db = firebase.database();
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            meetings: [],
            meetingUserKeys: [],
            popupUsers: [],
            loader: true,
            currUser: null
        }


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
                    .catch((res) => {
                        db.ref(`Meetings/${user.uid}/`).on('value', (snapshot) => {
                            let data = snapshot.val();
                            if (data !== null) {
                                console.log(data)
                                let { meetingUserKeys } = this.state;
                                let meetings = [];
                                // let meetingUserKeys = []
                                for (let key in data) {
                                    meetings.push(data[key]);
                                    if (!meetingUserKeys.includes(key) && data[key].status !== 'Cancelled')
                                        meetingUserKeys.push(key);
                                }
                                this.setState({ meetings, meetingUserKeys, loader: false })
                            }
                            else {
                                this.setState({ loader: false })
                            }

                        })

                        db.ref(`Requests/${user.uid}/`).on('value', (snapshot) => {
                            let data = snapshot.val();
                            if (data !== null) {
                                let { meetingUserKeys } = this.state;
                                // let meetingUserKeys = [];
                                let popupUsers = [];
                                for (let key in data) {
                                    if (!meetingUserKeys.includes(key))
                                        meetingUserKeys.push(key);
                                    if (data[key].showPopup) {
                                        popupUsers.push(data[key])
                                    }
                                }
                                this.setState({ meetingUserKeys, popupUsers })
                            }
                        })

                        this.props.saveUser(res);
                    })
            })
            .catch(() => this.props.history.replace('/'))
    }

    setMeeting() {
        const { currUser, meetingUserKeys } = this.state;
        firebase.database().ref(`Users`).once('value')
            .then(snap => {
                let data = snap.val();
                let currentUser;
                let allUsers = [];
                // debugger;
                for (let key in data) {
                    if (key === currUser) {
                        currentUser = data[key].Profile
                    }
                    if ("Profile" in data[key] && key !== currUser && !(meetingUserKeys.includes(key))) {
                        allUsers.push(data[key].Profile)
                    }
                }
                console.log(allUsers);
                console.log(currentUser);
                this.props.history.push('/dashboard/meeting', {
                    currentUser, allUsers
                })
            });
    }



    render() {
        const { loader, meetings, popupUsers } = this.state;
        console.log(this.state)
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

                {loader &&
                    <div className="loader-div">
                        <Loader
                            type="Puff"
                            color="#FD5D62"
                        />
                    </div>
                }
                {
                    meetings.length === 0 && !loader &&
                    <div>
                        <div className="das-alert">
                            <Alert bsStyle="danger">You don't have any meetings yet. Try Creating a new meeting.</Alert>
                        </div>
                    </div>
                }
                {
                    meetings.length !== 0 && !loader &&
                    <div>
                        <MeetingList meetings={meetings} user={'requestedUser'} />
                    </div>
                }

                {!loader &&
                    <div>
                        <div className="das-meeting-btn" onClick={() => this.setMeeting()} >
                            <i className="fa fa-calendar-plus-o"></i> Set a Meeting
                        </div>
                    </div>
                }

                {
                    popupUsers.length !== 0 && !loader &&
                    <Popup popupUsers={popupUsers} history={this.props.history} />
                }

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => dispatch(saveUser(user))
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);