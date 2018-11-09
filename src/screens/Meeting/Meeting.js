import React from 'react';
import { Navbar, Dropdown } from '../../components';
import firebase from '../../config/firebase';
import { checkUser, checkProfile } from '../../Helpers/Authchecker';
import swal from 'sweetalert2';
import Profile from '../Profile/Profile';
import Geofire from 'geofire';

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

                        if (this.props.location.state) {

                            const { currentUser, allUsers } = this.props.location.state;
                            let criteriaUsers = allUsers.filter((values, index) => {
                                let distance = Geofire.distance(currentUser.location, values.location);
                                let beverages = currentUser.selectedBeverages.find(bev => values.selectedBeverages.find(bev2 => bev === bev2));
                                let duration = currentUser.selectedDuration.find(dur => values.selectedDuration.find(dur2 => dur === dur2));
                                if (distance <= 5 && beverages && duration) {
                                    return values
                                }
                            })
                            console.log(criteriaUsers);


                        }
                        else {
                            this.props.history.replace('/dashboard')
                        }
                    })

            })
            .catch(() => this.props.history.replace('/'))
    }



    render() {
        return (
            <div>
                <Navbar>
                    <Dropdown history={this.props.history} />
                </Navbar>

            </div>
        )

    }
}

export default Meeting;


// let locationDistance = Geofire.distance(currentUser.location, allUsers[0].location);
// console.log(`geofire ${locationDistance}`);
// if (locationDistance <= 5) {
//     console.log('can meet')
// }
// else {
//     console.log('too far away')
// }