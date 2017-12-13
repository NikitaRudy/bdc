import React, { Component } from 'react';
import propTypes from 'prop-types';

import TopPlayersTable from './TopPlayersTable';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TopPlayersTable />;
    }
}

App.propTypes = {};

export default App;
