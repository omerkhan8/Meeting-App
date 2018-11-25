import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';

const db = firebase.database();

class Popup extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handelShow = this.handelShow.bind(this);
    }

    async  handleClose() {
        const { currentUser, popupUsers } = this.props;
        // popupUsers[0].showPopup = false;
        let updates = { showPopup: false }
        db.ref(`Requests/${currentUser.uid}/${popupUsers[0].senderUser.uid}`).update(updates);
        await this.setState({ show: false })
        popupUsers.length > 0 ?
            this.handelShow() :
            console.log('no more requests');
    }

    handelShow() {
        this.setState({ show: true })
    }

    componentDidMount() {
        this.handelShow();
    }

    showReq() {
        this.props.history.push('/requests');
    }

    render() {
        const { popupUsers, currentUser } = this.props;
        console.log(popupUsers)
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}  >
                    <Modal.Body>
                        <div className="popup-main-div">
                            <div className="popup-first-div">You've a new meeting request</div>
                            <div className="popup-avatar-div" style={{ left: '10px' }}>
                                <img src={currentUser.imageUrl[0]} alt="display" />
                            </div>
                            <div className="popup-avatar-div" style={{ right: '10px' }}>
                                <img src={popupUsers[0].senderUser.imageUrl[0]} alt="display" />
                            </div>
                            <div style={{ clear: 'both' }}></div>
                            <div className="popup-name-div">
                                {popupUsers[0].senderUser.name}
                            </div>
                            <p><b>Duration:</b> {popupUsers[0].senderUser.selectedDuration[0]}</p>
                            <p><b>Location:</b> {`${popupUsers[0].choosedPlace.name}, ${popupUsers[0].choosedPlace.location.address}`}</p>
                            <p><b>Date &amp; Time: </b> {popupUsers[0].choosedTime}</p>
                            <div>
                                <Button bsStyle="success" bsSize="large" onClick={() => { this.showReq() }} >Show Requests</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.DashboardReducer.user
    }
}

export default connect(mapStateToProps)(Popup);