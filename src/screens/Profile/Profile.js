import React from 'react';
import firebase from '../../config/firebase';
import Navbar from '../../components/Navbar';
import './Profile.css';
import Loader from 'react-loader-spinner';
import Biodata from '../../components/Biodata';
import Picture from '../../components/Picture';

const db = firebase.database();
const auth = firebase.auth();

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            loader: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref(`Users/${auth.currentUser.uid}/Profile`).once('value')
                    .then((snap) => {
                        let data = snap.val();
                        if (data !== null) {
                            this.props.history.replace('/dashboard');
                        }
                        else {
                            console.log("please creat your profile to get started!");
                            db.ref(`Users/${auth.currentUser.uid}/Data`).once('value')
                                .then((data) => {
                                    let userData = data.val();
                                    this.setState({ userData, loader: false })
                                })
                        }
                    })

            } else {
                alert('please login first')
                this.props.history.replace('/');
            }
        });

    }

    render() {
        const { userData, loader } = this.state;
        console.log(this.state)
        return (
            <div>
                <Navbar />
                {/* {loader &&
                    <div className="loader-div">
                        <Loader
                            type="ThreeDots"
                            color="#FD5D62"
                        />
                    </div>
                } */}
                {
                    // userData &&
                    <div>
                        <div className="get-start-div">
                            <div>
                                <div className="pf-heading-div">Welcome</div>
                                <div className="pf-heading1-div">Omer Khan</div>
                                <div className="pf-para-div">Please complete your profile before starting.</div>
                                <div className="pf-para1-div">Step 1/3</div>
                                <div>
                                    {/* <div className="pf-content-div">
                                        <Biodata />
                                    </div> */}
                                    <div className="pf-content1-div">
                                        <Picture />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                }
            </div>
        )
    }
}

export default Profile;