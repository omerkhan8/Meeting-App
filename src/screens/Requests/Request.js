import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import firebase from '../../config/firebase';
import { checkUser } from '../../Helpers/Authchecker';
import swal from 'sweetalert2';
import { Navbar, Dropdown, MeetingList, Popup, Direction } from '../../components';


const db = firebase.database();
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});

class Request extends React.Component {

    constructor() {
        super();
        this.state = {
            currUser: null,
            popupUsers: [],
            loader: true,
            requests: [],
            userLocation: null,
            placeLocation: null
        }
        this.direction = this.direction.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.accept = this.accept.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        checkUser()
            .then(user => {
                this.setState({ currUser: user.uid })

                db.ref(`Requests/${user.uid}/`).on('value', (snapshot) => {
                    let data = snapshot.val();

                    if (data !== null) {
                        let requests = [];
                        let popupUsers = [];
                        for (let key in data) {
                            requests.push(data[key])
                            if (data[key].showPopup) {
                                popupUsers.push(data[key])
                            }
                        }
                        this.setState({ requests, popupUsers, loader: false })
                    }
                    else {
                        this.setState({ loader: false, requests: [] })
                    }
                })
            })
            .catch(err => this.props.history.replace('/'))
    }

    direction(values) {
        const places = values.choosedPlace;
        const userLocation = values.requestedUser.location;
        this.handleShow(places, userLocation);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(places, userLocation) {
        let placeLocation = [];
        placeLocation = [places.location.lat, places.location.lng];
        this.setState({ show: true, placeLocation, userLocation });
    }

    async accept(userData) {
        const { currUser } = this.state;
        const senderUid = userData.senderUser.uid;
        await db.ref(`Requests/${currUser}/${senderUid}`).remove();
        userData.status = "Accepted";
        await db.ref(`Meetings/${currUser}/${senderUid}/`).set(userData);
        let obj = { status: 'Accepted' }
        await db.ref(`Meetings/${senderUid}/${currUser}`).update(obj);
        toast({
            type: 'success',
            title: 'Request Accepted!'
        });
        this.props.history.push('/dashboard');

    }

    async cancel(userData) {
        const { currUser } = this.state;
        const senderUid = userData.senderUser.uid;
        await db.ref(`Requests/${currUser}/${senderUid}`).remove();
        let obj = { status: 'Cancelled' }
        await db.ref(`Meetings/${senderUid}/${currUser}`).update(obj);

    }




    render() {
        const { loader, requests, userLocation, placeLocation } = this.state;
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

                {loader &&
                    <div className="loader-div">
                        <Loader
                            type="Triangle"
                            color="#FD5D62"
                        />
                    </div>
                }

                {
                    requests.length === 0 && !loader &&
                    <div>
                        <div className="das-alert">
                            <Alert bsStyle="danger">You've no new requests.</Alert>
                        </div>
                    </div>
                }

                {
                    requests.length !== 0 && !loader &&
                    <div>
                        <MeetingList
                            meetings={requests}
                            user={'senderUser'}
                            showButtons
                            getDirection={this.direction}
                            acceptReq={this.accept}
                            cancelReq={this.cancel}
                        />
                    </div>
                }

                <Modal show={this.state.show} onHide={this.handleClose} bsSize="large" >
                    <Modal.Body>
                        <Direction userLocation={userLocation} placeLocation={placeLocation} handleClose={this.handleClose} />
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default Request;