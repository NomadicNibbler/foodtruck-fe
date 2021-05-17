import  React from 'react';
// import { Component } from 'react'; //may need to hold state here for select menu
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import truckIcon from '../../assets/food-truck.svg';
const apiKey = process.env.REACT_APP_API_KEY;

function createKey(location) {
  return location.lat + location.lng
}

const MapView = ({ truckList, center }) => {
return (
    <main>
      <div className="map-buttons-container">
        <Link to="/trucklist">
          <button className="button">Truck List</button>
        </Link>
        <Link to="/newlocation">
          <button className="button">Change Location</button>
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
            <MarkerClusterer>
                {(clusterer) =>
                truckList.map((location) => (
                  <Marker 
                    key={createKey(location)}
                    position={location} 
                    clusterer={clusterer}
                    icon={{
                      url: truckIcon,
                      scaledSize: new window.google.maps.Size(40, 40)
                    }} 
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


export default React.memo(MapView)