import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../screens/Home/Home';
const Routes = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
            </div>
        </Router>
    )
}

export default Routes;