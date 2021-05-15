import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FoodTruck } from '../../assets/food-truck.svg';

const Header = () => {
  return (
    <>
    <header className="header">
      <h1 className="header-title">The Nomadic Nibbler</h1>
      <Link to='/'>
        <FoodTruck className="food-truck-img"/>
      </Link>
      <div className="speed-line"></div>
      <div className="speed-line second"></div>
      <div className="shadow"></div>
    </header>
    <div className="header-color-bar"></div>
    </>
  )
}

export default Header