import React from 'react';
import './Calendar.css';
import { Navbar, Dropdown } from '../../components';
import { checkUser } from '../../Helpers/Authchecker';
import moment from 'moment';
import InputMoment from 'input-moment';
import '../../../node_modules/input-moment/dist/input-moment.css';
import { FormGroup, FormControl } from 'react-bootstrap';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';


const db = firebase.database();

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currUser: null,
            places: null,
            today: moment()
        }
    }

    componentDidMount() {
        document.getElementsByClassName('cal-calendar-div')[0].getElementsByTagName('Button')[4].innerHTML = "Send Request";
        checkUser()
            .then(user => {
                this.setState({ currUser: user.uid })
                if (!this.props.location.state) {
                    this.props.history.replace('/dashboard/meeting/location');
                }
                else {
                    this.setState({ places: this.props.location.state.places })
                }

            })
            .catch(err => this.props.history.replace('/'))
    }

    handleChange = today => {
        this.setState({ today });
    };

    handleSave = () => {
        const { today } = this.state;
        var now = moment()
        let velidate = moment(now).isSameOrBefore(today);

        if (velidate) {
            swal({
                title: 'Send the request?',
                // text: `Do you want to meet with ${data.name}?`,
                type: 'info',
                customClass: 'custom-swal-meeting',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, send it!'
            }).then((result) => {
                if (result.value) {
                    const { currentUser, requestedUser } = this.props;
                    const { places } = this.state;
                    let choosedTime = today.format('LLLL');
                    console.log(choosedTime)
                    const meetingData = {
                        senderUser: currentUser,
                        requestedUser,
                        choosedPlace: places,
                        choosedTime,
                        status: 'Pending',
                        // showPopup: true
                    }

                    db.ref(`Meetings/${currentUser.uid}/${requestedUser.uid}`).set(meetingData)
                        .then(res => {
                            meetingData.showPopup = true;
                            db.ref(`Requests/${requestedUser.uid}/${currentUser.uid}`).set(meetingData)
                                .then(resp => {
                                    toast({
                                        type: 'success',
                                        title: 'Request sent successfully'
                                    })
                                    this.props.history.replace('/dashboard');
                                })
                        })
                }
            })


        }
        else {
            toast({
                type: 'warning',
                title: 'cannot select past date'
            })
            this.setState({ today: moment() })
        }

    };


    render() {
        // console.log(this.state)
        const { today } = this.state;
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

                <form>
                    <div className="cal-calendar-div">
                        <div className="cal-input-div">
                            <FormGroup bsSize="large" style={{ margin: '0' }}>
                                <FormControl type="text" readOnly value={today.format('llll')} />
                            </FormGroup>
                        </div>
                        <InputMoment
                            moment={today}
                            onChange={this.handleChange}
                            onSave={this.handleSave}
                            prevMonthIcon="fa fa-angle-left"
                            nextMonthIcon="fa fa-angle-right"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.DashboardReducer.user,
        requestedUser: state.MeetingReducer.requestedUser
    }
}

export default connect(mapStateToProps)(Calendar);


