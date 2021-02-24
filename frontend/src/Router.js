import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import BaseRoute from './Route';

// Vistas
import Home from './pages/Home';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <BaseRoute exact path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default Router;