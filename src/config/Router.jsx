import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as Screens from '../screens';

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Screens.Home} />
            <Route path="/profile" component={Screens.Profile} />
            <Route exact path="/dashboard" component={Screens.Dashboard} />
            <Route path="/dashboard/meeting" component={Screens.Meeting} />
        </div>
    </Router>
)

export default Routes;