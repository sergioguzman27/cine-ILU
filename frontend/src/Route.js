import React, { Component, Fragment } from "react";
import Header from './components/Header';
import { Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";

class BaseRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                <Fragment>
                    <Header />
                    <div className="w-100">
                        <Component {...props} />
                    </div>
                    <Footer />
                </Fragment>
            )}/>
        )
    }
}

export default BaseRoute;
