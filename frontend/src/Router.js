import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import BaseRoute from './Route';

// Vistas
import Home from './pages/Home';
import Proximamente from './pages/Proximamente';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <BaseRoute exact path="/" component={Home} />
                <BaseRoute exact path="/proximamente" component={Proximamente} />
            </Switch>
        </HashRouter>
    )
}

export default Router;