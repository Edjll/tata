import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './index.css';
import {AuthService} from "./service/auth-service";
import {RequestService} from "./service/request-service";

const app = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router/>
        </React.StrictMode>,
        document.getElementById("root")
    );
}

AuthService.init(() => {
    RequestService.init();
    app();
});