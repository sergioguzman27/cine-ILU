import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import BaseRoute from './Route';

// Vistas
import Home from './pages/Home';
import Proximamente from './pages/Proximamente';
import Funciones from './pages/Funciones';
import DetalleFuncion from './pages/DetalleFuncion';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <BaseRoute exact path="/" component={Home} />
                <BaseRoute exact path="/proximamente" component={Proximamente} />
                <BaseRoute exact path="/funciones" component={Funciones} />
                <BaseRoute exact path="/funcion/:id" component={DetalleFuncion} />
            </Switch>
        </HashRouter>
    )
}

export default Router;