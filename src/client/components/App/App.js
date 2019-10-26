import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import TopPlayersTable from './TopPlayersTable';
import ProgressTable from './ProgressTable';
import Navigation from './Navigation';
import Statistics from './Statistics';

const App = () => {
    const history = useHistory();

    useEffect(() => {
        ReactGA.pageview(history.location.pathname);
        history.listen(location => ReactGA.pageview(location.pathname));
    }, []);

    return (
        <main>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Statistics} />
                <Route exact path="/rankings">
                    <Redirect to="/rankings/core" />
                </Route>
                <Route
                    exact
                    path="/rankings/core"
                    component={TopPlayersTable}
                />
                <Route
                    exact
                    path="/rankings/support"
                    component={TopPlayersTable}
                />
                <Route exact path="/progress">
                    <Redirect to="/progress/core" />
                </Route>
                <Route exact path="/progress/core" component={ProgressTable} />
                <Route
                    exact
                    path="/progress/support"
                    component={ProgressTable}
                />
                <Redirect to="/" />
            </Switch>
        </main>
    );
};

export default App;
