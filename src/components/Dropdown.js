import React from 'react';
import '../App.css';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase';

const auth = firebase.auth();

const Dropdown = (props) => {
    const styles = {
        backgroundColor: '#FD5D62',
        color: 'white',
        borderColor: '#FD5D62',
        fontSize: '25px'
    }
    return (
        <div className="dropdown-main-div">
            <ButtonToolbar>
                <DropdownButton
                    title={<i className='fa fa-user-circle'></i>}
                    style={styles}
                    id="dropdown-btn"
                    pullRight
                >
                    <Link className="Link-Router" to="/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>
                    <Link className="Link-Router" to="/requests"><i className="fa fa-user-plus"></i> Requests</Link>
                    <MenuItem divider />
                    <MenuItem onClick={() => {
                        auth.signOut()
                            .then(() => props.history.replace('/'))
                    }} eventKey="3"><span style={{ fontSize: '1.3em' }}><i className="fa fa-sign-out"></i> Logout</span></MenuItem>
                </DropdownButton>
            </ButtonToolbar>
        </div>
    )
}

export default Dropdown;