import React, { Component } from 'react';
import background from '../../assets/static/background.jpg';
import './home.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div
                    style={{backgroundImage: `linear-gradient(180deg,rgba(0,0,0,0.5) 0%,#000000 100%), url(${background})`}}
                    className="portada"
                >
                    <div className="">
                        <h5 className="blanco">Ahora online</h5>
                        <h1 className="blanco">¡Disfruta de las mejores peliculas!</h1>
                        <button className="btn btn-primary mt-4">Ver Estrenos</button>

                    </div>
                </div>
                <div className="estrenos">
                </div>
            </div>
        );
    }
}

export default App;
