import React from 'react';
import truck from '../../mocktruck.js';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';

const TruckDetails = () => {
  console.log(truck)
  return (
    <section className="truck-details-container">
      <article className="truck-logo-container">
        <img src={truck.data.attributes.logo} alt={`${truck.data.name} logo`} className="truck-logo"/>
        <div className="truck-links">
          <h1 className="truck-name">{truck.data.attributes.name}</h1>
          <a href={truck.data.attributes.website} className="truck-website">{truck.data.attributes.website}</a>
        </div>
      </article>
      <SocialMediaLinks
        links={truck.data.attributes.socials}
      />
      <p className="truck-description-intro">About Us:</p>
      <p className="truck-description">{truck.data.attributes.description}</p>
    </section>
  )
}

export default TruckDetails; 