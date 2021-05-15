import React from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import user from  "../../mockuser.js"


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
      googleMapsApiKey="AIzaSyDhhYY1cdPqk1Uqa5xMhF2g_1evSW_J4RQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerLocation}
        zoom={12}
      >
        <>
        <Marker
          position={centerLocation}
        />
        <MarkerClusterer
          averageCenter={centerLocation}
        >
            {(clusterer) =>
            truckLocations.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>
        </>
      </GoogleMap>
    </LoadScript>
  )
}


export default React.memo(MapView)