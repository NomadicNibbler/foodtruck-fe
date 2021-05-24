import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FoodTruck } from '../../assets/food-truck.svg';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const location = useLocation().pathname
  return (
    <>
    <header className="header">
      {location !== "/login" && 
      <Link to="/" className="log-out-link">
        <div>
          <FaUser className="log-out-icon" alt="log-out-icon      "/>
          <p className="log-out-text">Log Out</p>
        </div>
      </Link>
      }
      <h1 className="header-title" data-cy='title'>The Nomadic Nibbler</h1>
      <FoodTruck className="food-truck-img"/>
      <div className="speed-line"></div>
      <div className="speed-line second"></div>
      <div className="shadow"></div>
    </header>
    <div className="header-color-bar"></div>
    </>
  )
}

export default Header