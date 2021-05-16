import React from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import user from  "../../mockuser.js"
import truckIcon from '../../assets/food-truck.svg';
const apiKey = process.env.REACT_APP_API_KEY

const containerStyle = {
  height: '400px',
  width: '80%',
}

function createKey(location) {
  return location.lat + location.lng
}

function createLocationList(user) {
  const trucks = user.data.attributes.trucks
  const truckList = trucks.map(truck => {
    return {lat: Number(truck.lat), lng: Number(truck.long) }
  });
  return truckList
}

const MapView = () => {
  //these will be props in the future
const truckLocations = createLocationList(user)
const centerLocation = {lat: Number(user.data.attributes.lat), lng: Number(user.data.attributes.long)}
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerLocation}
        zoom={13}
      >
        <>
        <Marker
          position={centerLocation}
        />
        <MarkerClusterer>
            {(clusterer) =>
            truckLocations.map((location) => (
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
  )
}


export default React.memo(MapView)