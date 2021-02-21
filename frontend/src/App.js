import React from 'react';

const App = (props) => {
    const { title, name } = props;
    return (
        <div>
            <h1>{title}</h1>
            <h1>name {name}</h1>
        </div>
    )
};

export default App;
