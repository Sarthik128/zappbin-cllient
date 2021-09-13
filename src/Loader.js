import React from 'react';
import './Loader.css';
import logo from './logo.svg';

export default function Loader() {
    return (
        <div className="background">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}
