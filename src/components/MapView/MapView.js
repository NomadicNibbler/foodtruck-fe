import  React from 'react';
import { Component } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import truckIcon from '../../assets/food-truck.svg';
const apiKey = process.env.REACT_APP_API_KEY;

const containerStyle = {
  height: '400px',
  width: '100%',

}

function createKey(location) {
  return location.lat + location.lng
}

const MapView = ({ truckList, center }) => {
return (
    <main className="map-container">
      <Link to="/trucklist">
        <button>Toggle</button>
      </Link>
      <select>
        <option>please select</option>
        <option>cash only</option>
        <option>closests</option>
        <option>farthest</option>
      </select>
      <button>change location</button>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
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
    </main>
  )

}


export default React.memo(MapView)