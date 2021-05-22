import  React from 'react';
import { useState } from 'react';
import { createTruckLocation } from '../../utility.js';
import { GoogleMap, LoadScript, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import truckIcon from '../../assets/food-truck.svg';
const apiKey = process.env.REACT_APP_API_KEY;

function createKey(truck) {
  return truck.attributes.lat + truck.attributes.long
}

const MapView = ({ trucks, center }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [clickedTruck, setClickedTruck] = useState('');

  if(!Object.keys(center).length) {
    return (
      <h1>Loading...</h1>
    )
} else {
  return (
      <main>
        <div className="map-buttons-container">
          <Link to="/trucklist">
            <button className="button" data-cy='truck-list-button'>Truck List</button>
          </Link>
          <Link to="/newlocation">
            <button className="button" data-cy='change-location-button'>Change Location</button>
          </Link>
        </div>
        <section className="map-container">
          <LoadScript
            googleMapsApiKey={apiKey}
          >
            <GoogleMap
              mapContainerClassName="map"
              center={center}
              zoom={13}
            >
              <>
                <Marker
                  position={center}
                />
                
                { selectedCenter && <InfoWindow
                  onCloseClick={() => {
                      setSelectedCenter(null);
                  }}
                  position={selectedCenter}
                >
                  <div>
                    <p>See more details about this truck</p>
                    <Link to={`/trucks/${clickedTruck.split(' ').join('_')}`}>
                      <p>Show me!</p>
                    </Link>
                  </div>
                </InfoWindow>}
            
                <MarkerClusterer>
                  {(clusterer) =>
                  trucks.map((truck) => (
                    <Marker 
                      key={createKey(truck)}
                      title={truck.attributes.name}
                      position={createTruckLocation(truck)} 
                      clusterer={clusterer}
                      icon={{
                        url: truckIcon,
                        scaledSize: new window.google.maps.Size(40, 40)
                      }} 

                      onClick={() => {setSelectedCenter(createTruckLocation(truck)); setClickedTruck(truck.attributes.name);}}
                    /> 
                  ))
                  }
                </MarkerClusterer>
              </>
            </GoogleMap>
          </LoadScript>
        </section>
      </main>
    )
  }
}


export default React.memo(MapView)