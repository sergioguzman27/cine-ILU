import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import BaseRoute from './Route';

// Vistas
import Home from './pages/Home';
import Proximamente from './pages/Proximamente';
import Funciones from './pages/Funciones';
import DetalleFuncion from './pages/DetalleFuncion';
import CompraTickets from './pages/CompraTickets';

const Router = () => {
    return (
        <HashRouter>
            <Switch>
                <BaseRoute exact path="/" component={Home} />
                <BaseRoute exact path="/proximamente" component={Proximamente} />
                <BaseRoute exact path="/funciones" component={Funciones} />
                <BaseRoute exact path="/funcion/:id" component={DetalleFuncion} />
                <BaseRoute exact path="/comprar/:id" component={CompraTickets} />
            </Switch>
        </HashRouter>
    )
}

export default Router;