import React from 'react';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';
import truckIcon from '../../assets/food-truck.svg';
import { TiArrowBack } from 'react-icons/ti';

const TruckDetails = ({ truckDetails, history }) => {
  const paymentTypes = truckDetails.attributes.payment_methods.map(method => {
    return <p className="truck-details-info">{method.split('_').join(' ')} <span className="divider">|</span></p>
  })
  return (
    <section className="truck-details-container">
      <button
        className="truck-details-back-btn"
        name="go-back" 
        onClick={() => history.goBack()} 
        aria-label="go-back"
        data-cy="truck-details-back-btn"
      >
        <TiArrowBack className="truck-details-back-icon"/>
      </button>
      <article className="truck-details-card" data-cy="truck-info">
        <div className="truck-details-links">
          <h1 className="truck-details-name" data-cy="truck-name">{truckDetails.attributes.name}</h1>
          <a 
            href={truckDetails.attributes.website} className="truck-website"
            data-cy="truck-details-website"
            aria-label="truck-website"
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
        {!truckDetails.attributes.logo && 
          <img 
        src={truckIcon} 
        alt={`${truckDetails.attributes.name} logo`} 
        className="truck-details-logo-default"
        data-cy="truck-details-logo"
          />
        }
        {truckDetails.attributes.logo && <img 
          src={truckDetails.attributes.logo} 
          alt={`${truckDetails.attributes.name} logo`} 
          className="truck-details-logo"
          data-cy="truck-details-logo"
        />}
        <SocialMediaLinks
          links={truckDetails.attributes.socials}
        />
        <p className="truck-details-intro" data-cy="truck-intro">About Us:</p>
        <p className="truck-details-info" data-cy="truck-description">{truckDetails.attributes.description}</p>
        <p className="truck-details-intro">Payment Types:</p>
        <div className="truck-details-payments-container" data-cy="payment-methods">
          {paymentTypes}
        </div>
      </article>
    </section>
  )
}

export default TruckDetails; 