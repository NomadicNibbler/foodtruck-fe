import React from 'react';
import truck from '../../mocktruck.js';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';

const TruckDetails = ({ truckDetails }) => {
  console.log(truckDetails)
  return (
    <section className="truck-details-container" data-cy="truck-info">
      <div className="truck-details-links">
        <h1 className="truck-details-name" data-cy="truck-name">{truck.data.attributes.name}</h1>
        <a 
          href={truckDetails.attributes.website} className="truck-website"
          data-cy="truck-details-website"
          >
            {truckDetails.attributes.website}
        </a>
      </div>
      <div className="speech-bubble">
        <div className="circular-sb">
        Yum!
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
      </div>
      <img 
        src={truckDetails.attributes.logo} 
        alt={`${truck.data.name} logo`} 
        className="truck-details-logo"
        data-cy="truck-details-logo"
      />
      <SocialMediaLinks
        links={truckDetails.attributes.socials}
      />
      <p className="truck-details-intro" data-cy="truck-intro">About Us:</p>
      <p className="truck-details-description" data-cy="truck-description">{truckDetails.attributes.description}</p>
    </section>
  )
}

export default TruckDetails; 