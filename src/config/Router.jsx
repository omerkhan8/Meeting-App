import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Screens from '../screens';

const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Screens.Home} />
            <Route path="/profile" component={Screens.Profile} />
            <Route exact path="/dashboard" component={Screens.Dashboard} />
            <Route exact path="/dashboard/meeting" component={Screens.Meeting} />
            <Route path="/dashboard/meeting/location" component={Screens.Location} />
            <Route path="/dashboard/meeting/calendar" component={Screens.Calendar} />
        </div>
    </Router>
)

export default Routes;