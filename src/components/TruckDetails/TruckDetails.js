import React from 'react';
import truck from '../../mocktruck.js';

const TruckDetails = () => {
  console.log(truck)
  return (
    <section className="truck-details-container">
      <article className="truck-logo-container">
        <img src={truck.data.attributes.logo} alt={`${truck.data.name} logo`} className="truck-logo"/>
        <i class="truck-social-icon"></i>
      </article>
      <p className="truck-description">{truck.data.attributes.description}</p>
    </section>
  )
}

export default TruckDetails; 