import React from 'react';
import './Dashboard.css'
import { checkUser, checkProfile } from '../../Helpers/Authchecker';
import { Navbar, Dropdown } from '../../components';
import firebase from '../../config/firebase';
import Loader from 'react-loader-spinner';
import { Alert } from 'react-bootstrap';
import swal from 'sweetalert2';

const db = firebase.database();
const auth = firebase.auth();
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
            meetings: null,
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
                    .catch(() => {
                        db.ref(`Users/${user.uid}/Meetings`).once('value')
                            .then(snap => {
                                let data = snap.val();
                                data !== null ?
                                    this.setState({ meetings: data, loader: false })
                                    :
                                    this.setState({ meetings: false, loader: false })

                            })

                    })
            })
            .catch(() => this.props.history.replace('/'))
    }

    setMeeting() {
        const { currUser } = this.state;
        firebase.database().ref(`Users`).once('value')
            .then(snap => {
                console.log(snap.val())
                let data = snap.val();
                let currentUser;
                let allUsers = [];
                for (let key in data) {
                    if (key === currUser) {
                        currentUser = data[key].Profile
                    }
                    if ("Profile" in data[key] && key !== currUser) {
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
        const { loader, meetings } = this.state;
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
                    meetings === false &&
                    <div>
                        <div className="das-alert">
                            <Alert bsStyle="danger">You don't have any meetings yet. Try Creating a new meeting.</Alert>
                        </div>
                    </div>
                }

                {(meetings === false || meetings) && <div>
                    <div className="das-meeting-btn" onClick={() => this.setMeeting()} >
                        <i className="fa fa-calendar-plus-o"></i> Set a Meeting
                    </div>
                </div>}

            </div>
        )
    }
}

export default Dashboard;