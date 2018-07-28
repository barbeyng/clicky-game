import React from 'react'
import './NavBar.css'

const NavBar = (props) => (

    <nav className="nav nav-pills nav-fill">
  
      <li className="nav-item">
        <h1>The Corgi Game</h1>
      </li>
  
      <li className="nav-item navbar-text">
        {props.gameMessage}
      </li>
  
      <li className="nav-item navbar-text">
        Current Score: {props.score} | Top Score: {props.topScore}
      </li>
  
    </nav>
  );

export default NavBar;