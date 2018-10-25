import React from 'react';
import firebase from '../../config/firebase';
import Navbar from '../../components/Navbar';
import './Profile.css';
import Loader from 'react-loader-spinner';
import Biodata from '../../components/Biodata';
import Picture from '../../components/Picture';
import Details from '../../components/Details';

const db = firebase.database();
const auth = firebase.auth();

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            loader: true,
            Bio: true,
            Pic: false,
            Detail: false,
            step: 1
        }
        this.bioNext = this.bioNext.bind(this);
        this.picNext = this.picNext.bind(this);
        this.detailNext = this.detailNext.bind(this);
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
        this.setState({ selectedBeverages, selectedDuration, Detail: false, step: step + 1 });

    }

    render() {
        const { userData, loader, Bio, Pic, Detail, step } = this.state;
        console.log(this.state)
        return (
            <div>
                <Navbar />
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
                                <div className="pf-para1-div">Step {step}/3</div>
                                <div>
                                    {Bio && <div className="pf-content-div">
                                        <Biodata bioNext={this.bioNext} />
                                    </div>}

                                    {Pic && <div className="pf-content1-div">
                                        <Picture picNext={this.picNext} />
                                    </div>}
                                    {Detail &&<div className="pf-content2-div">
                                        <Details detailNext={this.detailNext} />
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