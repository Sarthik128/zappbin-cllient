import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="main">
        <div className="home-main">
            <nav>
            <div className="logo1">Zapp<span>Bin</span></div>
            <div>
            <ul>
                <li>About</li>
                <li>Contact</li>
                <li>Help</li>
            </ul>
            </div>
            </nav>
        </div>
        <div className="body">  
        <div className="content">
            Save and Share your Code with Eazeee......
               
        <Link to="/new"><button>Create New Note</button></Link>
        </div>
        <div className="image">
            <img src='/assets/example.png' />
        </div>
        </div>
        <div className="footer">
            Copyright &copy; 2021
        </div>
        </div>
    )
}
