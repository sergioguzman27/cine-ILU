import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';

// Vistas
import Home from './pages/Home';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default Router;