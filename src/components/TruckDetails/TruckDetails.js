import React from 'react';
import truck from '../../mocktruck.js';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';

const TruckDetails = ({ truckDetails }) => {
  console.log(truckDetails)
  return (
    <section className="truck-details-container">
      <article 
        className="truck-logo-container"
        data-cy="truck-info"
      >
        <img 
          src={truckDetails.attributes.logo} 
          alt={`${truck.data.name} logo`} 
          className="truck-logo"
          data-cy="truck-logo"
        />
        <div className="truck-links">
          <h1 className="truck-name" data-cy="truck-name">{truck.data.attributes.name}</h1>
          <a 
            href={truckDetails.attributes.website} className="truck-website"
            data-cy="truck-website"
            >
              {truckDetails.attributes.website}
          </a>
        </div>
      </article>
      <SocialMediaLinks
        links={truckDetails.attributes.socials}
      />
      <p className="truck-description-intro" data-cy="truck-intro">About Us:</p>
      <p className="truck-description" data-cy="truck-description">{truckDetails.attributes.description}</p>
    </section>
  )
}

export default TruckDetails; 