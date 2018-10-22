import React from 'react';
import firebase from '../../config/firebase';

const db = firebase.database();
const auth = firebase.auth();

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         db.ref(`Users/${auth.currentUser.uid}/Profile`).once('value')
        //             .then((snap) => {
        //                 let data = snap.val();
        //                 if (data !== null) {
        //                     this.props.history.replace('/dashboard');
        //                 }
        //                 else{
        //                     console.log("please creat your profile to get started!");
        //                 }
        //             })

        //     } else {
        //         alert('please login first')
        //         this.props.history.replace('/');
        //     }
        // });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>hello profile</h1>
            </div>
        )
    }
}

export default Profile;