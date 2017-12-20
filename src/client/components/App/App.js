import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';

import TopPlayersTable from './TopPlayersTable';
import ProgressTable from './ProgressTable';
import Navigation from './Navigation';
import Statistics from './Statistics';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Navigation />
                {/* <Route exact path ="/" component={ Statistics } /> */}
                <Route exact path="/rankings" component={ TopPlayersTable } />
                <Route exact path="/progress" component={ ProgressTable } />
            </main>
        );
    }
}

App.propTypes = {};

export default App;
