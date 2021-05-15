import React from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'


const containerStyle = {
  height: '400px',
  width: '80%',
}

const center =  { lat: 49.246292, lng:  -123.116226}

const locations = [
  { lat: 49.246292, lng:  -123.116425},
  { lat: 49.246292, lng:  -123.116827}
]


function createKey(location) {
  return location.lat + location.lng
}

const MapView = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDhhYY1cdPqk1Uqa5xMhF2g_1evSW_J4RQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <>
        <Marker
          position={center}
        />
        <MarkerClusterer
          averageCenter={center}
        >
            {(clusterer) =>
            locations.map((location) => (
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