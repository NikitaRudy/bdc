import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

import TopPlayersTable from './TopPlayersTable';
import ProgressTable from './ProgressTable';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <h1>BDC LEADERBOARDS</h1>
                <div className="navigation">
                    <NavLink tag={ Link } to="/" >Rankings</NavLink>
                    <NavLink tag={ Link } to="/progress" >Progress</NavLink >
                </div>
                <Route exact path="/" component={ TopPlayersTable } />
                <Route exact path="/progress" component={ ProgressTable } />
            </main>
        );
    }
}

App.propTypes = {};

export default App;
