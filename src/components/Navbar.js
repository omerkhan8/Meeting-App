import React from 'react';
import '../App.css';
import Logo from '../images/mylogo2.png'


const Navbar = (props) => (
    <div className="div-nav">
        <img src={Logo} alt="logo" width="80px" height="80px" />
        <span className="div-nav-text"> Let's Meet</span>
        <div>
            {props.children}
        </div>
    </div>
)


export default Navbar;
