import React from 'react';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as Screens from '../screens';
const Routes = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Screens.Home} />
                <Privateroute path="/profile" component={Screens.Profile} />
                <Privateroute path="/dashboard" component={Screens.Dashboard} />
            </div>
        </Router>
    )
}

export default Routes;

