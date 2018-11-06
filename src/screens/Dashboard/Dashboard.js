import React from 'react';
import './Dashboard.css'
import checkLogin from '../../Helpers/Authchecker';
import { Navbar, Dropdown } from '../../components';
import firebase from '../../config/firebase';
import Loader from 'react-loader-spinner';

const db = firebase.database();
const auth = firebase.auth()

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            meetings: null,
            loader: true
        }
        
    }



    componentDidMount() {
        checkLogin()
            .then(user => {
                db.ref(`Users/${user.uid}/Meetings`).once('value')
                    .then(snap => {
                        let data = snap.val();
                        data !== null ?
                            this.setState({ meetings: data, loader: false })
                            :
                            this.setState({ meetings: false, loader: false })

                    })

            })
            .catch(() => this.props.history.replace('/'))
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
                {!meetings &&
                    <div>

                    </div>
                }

            </div>
        )
    }
}

export default Dashboard;