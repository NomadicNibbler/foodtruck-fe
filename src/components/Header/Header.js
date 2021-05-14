import React from 'react';
import { ReactComponent as FoodTruck } from '../../assets/food-truck.svg';

const Header = () => {
  return (
    <>
    <header className="header">
      <h1 className="header-title">The Nomadic Nibbler</h1>
      <FoodTruck className="food-truck-img"/>
      <div class="speed-line"></div>
      <div class="speed-line second"></div>
      <div class="shadow"></div>
    </header>
    <div className="header-color-bar"></div>
    </>
  )
}

export default Header