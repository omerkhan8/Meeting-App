import React from 'react';
import './Home.css';
import Slideshow from "react-slidez";
import Logo from '../../images/mylogo2.png';
import Logo1 from '../../images/mylogo1.png';
import { Modal } from 'react-bootstrap';
import firebase from '../../config/firebase';
import swal from 'sweetalert2';
import { checkUser } from '../../Helpers/Authchecker';


var provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.database();
const auth = firebase.auth();
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: ['https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/SdAO6Qg/videoblocks-close-up-of-a-couple-holding-hands-across-the-table-on-a-coffee-date_bf2wymc3e_thumbnail-full01.png',
                'https://media.swncdn.com/cms/CW/faith/41207-friends-with-sparklers-1200.1200w.tn.jpg',
                'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9b9cb51ea58b136b1ccfc012192afcc&w=1000&q=80',
                'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=044e5d85cd16e79671287971a06be066&w=1000&q=80'
            ],
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        document.getElementById('slidshow-parent').firstChild.style.backgroundColor = '#333';
        // auth.onAuthStateChanged(user => {
        //     if (user) {
        //         this.props.history.replace('/dashboard');
        //     }
        // })
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    fbLogin() {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
            const userObj = {
                name: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                userId: user.uid
            };
            return db.ref(`Users/${user.uid}/Data`).set(userObj);

        }).then(() => {
            toast({
                type: 'success',
                title: 'Signed in successfully'
            })
            db.ref(`Users/${auth.currentUser.uid}/Profile`).once('value').then((snap) => {
                let data = snap.val()
                if (data === null) {
                    this.props.history.push('/profile');
                }
                else {
                    this.props.history.push('/dashboard');
                }
            })
        }).catch(function (error) {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // var email = error.email;
            // var credential = error.credential;
            console.log(error);
        });
    }


    render() {
        const { images } = this.state;
        return (
            <div id="slidshow-parent">
                <Slideshow
                    slides={images}
                    showArrows={false}
                    slideInterval={4500}
                    enableKeyboard={false}
                />
                <div className="div-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="div-home-heading">
                    <div className="heading-child">
                        Match. Chat. Meet.
                    </div>
                    <div className="heading-child1">
                        Come for what you love. <br />
                        Stay for what you discover.
                    </div>
                    <div className="heading-child2">
                        <div className="get-started-btn" onClick={this.handleShow}>
                            Get Started
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose} >
                            <Modal.Body>
                                <div className="div-logo-modal">
                                    <img src={Logo1} alt="" />
                                </div>
                                <div>
                                    <div className="div-modal-btn" onClick={() => this.fbLogin()}>
                                        <i className="fa fa-facebook-official" style={{ fontSize: "28px", position: 'relative', top: '4px' }}></i> LOG IN WITH FACEBOOK
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;