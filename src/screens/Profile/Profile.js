import React from 'react';
import firebase from '../../config/firebase';
import './Profile.css';
import Loader from 'react-loader-spinner';
import * as Custom from '../../components';
import { checkUser } from '../../Helpers/Authchecker';
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

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            loader: true,
            Bio: true,
            Pic: false,
            Detail: false,
            map: false,
            step: 1,
            uid: null
        }
        this.bioNext = this.bioNext.bind(this);
        this.picNext = this.picNext.bind(this);
        this.detailNext = this.detailNext.bind(this);
        this.mapNext = this.mapNext.bind(this);
    }

    componentDidMount() {
        checkUser()
            .then(user => {
                this.setState({ uid: user.uid })
                db.ref(`Users/${auth.currentUser.uid}/Profile`).once('value')
                    .then((snap) => {
                        let data = snap.val();
                        if (data !== null) {
                            toast({
                                type: 'warning',
                                title: 'Profile already created'
                            })
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

            })
            .catch(() => this.props.history.replace('/'))

    }

    bioNext({ nickName, number }) {
        let { step } = this.state;
        this.setState({ nickName, number, Bio: false, Pic: true, step: step + 1 })
    }

    picNext(imageUrl) {
        let { step } = this.state;
        this.setState({ imageUrl, Pic: false, Detail: true, step: step + 1 });

    }

    detailNext(selectedBeverages, selectedDuration) {
        let { step } = this.state;
        this.setState({ selectedBeverages, selectedDuration, Detail: false, map: true, step: step + 1 });

    }

    async mapNext(location) {
        await this.setState({ location })
        const { nickName, number, imageUrl, selectedDuration, selectedBeverages, uid } = this.state;
        let profileData = { nickName, number, imageUrl, selectedBeverages, selectedDuration, location, uid };
        db.ref(`Users/${auth.currentUser.uid}/Profile`).set(profileData)
            .then(() => {
                toast({
                    type: 'success',
                    title: 'Profile created successfully'
                })
                this.props.history.push('/dashboard');

            })
    }

    render() {
        const { userData, loader, Bio, Pic, Detail, step, map } = this.state;
        console.log(this.state)
        return (
            <div>
                <Custom.Navbar />
                {loader &&
                    <div className="loader-div">
                        <Loader
                            type="ThreeDots"
                            color="#FD5D62"
                        />
                    </div>
                }
                {
                    userData &&
                    <div>
                        <div className="get-start-div">
                            <div>
                                <div className="pf-heading-div">Welcome</div>
                                <div className="pf-heading1-div">Omer Khan</div>
                                <div className="pf-para-div">Please complete your profile before starting.</div>
                                <div className="pf-para1-div">Step {step}/4</div>
                                <div>
                                    {Bio && <div className="pf-content-div">
                                        <Custom.Biodata bioNext={this.bioNext} />
                                    </div>}

                                    {Pic && <div className="pf-content1-div">
                                        <Custom.Picture picNext={this.picNext} />
                                    </div>}
                                    {Detail && <div className="pf-content2-div">
                                        <Custom.Details detailNext={this.detailNext} />
                                    </div>}
                                    {map && <div className="pf-content3-div">
                                        <Custom.Map mapNext={this.mapNext} />
                                    </div>}
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


// auth.onAuthStateChanged((user) => {
//     if (user) {
//         db.ref(`Users/${auth.currentUser.uid}/Profile`).once('value')
//             .then((snap) => {
//                 let data = snap.val();
//                 if (data !== null) {
//                     this.props.history.replace('/dashboard');
//                 }
//                 else {
//                     console.log("please creat your profile to get started!");
//                     db.ref(`Users/${auth.currentUser.uid}/Data`).once('value')
//                         .then((data) => {
//                             let userData = data.val();
//                             this.setState({ userData, loader: false })
//                         })
//                 }
//             })

//     } else {
//         alert('please login first')
//         this.props.history.replace('/');
//     }
// });