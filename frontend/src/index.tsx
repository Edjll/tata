import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './index.css';

const app = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router/>
        </React.StrictMode>,
        document.getElementById("root")
    );
}

app();