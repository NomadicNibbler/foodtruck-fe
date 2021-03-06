import  React from 'react';
import { useState } from 'react';
import { createTruckLocation, createKey, createTrucksByRadius } from '../../utility.js';
import { GoogleMap, LoadScript, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import { Link, Redirect } from 'react-router-dom';
import truckIcon from '../../assets/food-truck.svg';
const apiKey = process.env.REACT_APP_API_KEY;

const MapView = ({ trucks, center, error }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [clickedTruck, setClickedTruck] = useState('');
  const [radius, setRadius] = useState(40);
  const trucksByRadius = createTrucksByRadius(trucks, radius);

  const loader = () => {
    if (!Object.keys(center).length && !error) {
      return <h1>Loading...</h1>
    } else if (error.includes('4')) {
      return (
        <Redirect to='/login'/>
      )
    } else if(error === "Location invalid, please enter another location") {
        return <Redirect to='/newlocation'/>
    } else {
      return (
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

              {selectedCenter && <InfoWindow
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
                  trucksByRadius.map((truck) => (
                    <Marker
                      key={createKey(truck)}
                      title={truck.attributes.name}
                      position={createTruckLocation(truck)}
                      clusterer={clusterer}
                      icon={{
                        url: truckIcon,
                        scaledSize: new window.google.maps.Size(40, 40)
                      }}

                      onClick={() => { setSelectedCenter(createTruckLocation(truck)); setClickedTruck(truck.attributes.name); }}
                    />
                  ))
                }
              </MarkerClusterer>
            </>
          </GoogleMap>
        </LoadScript>
      </section>
      )
    }
  }
  

  return (
      <main>
        {!error.includes('4') && <div className="map-buttons-container">
          <div>
            <Link to="/trucklist">
              <button className="button" data-cy='truck-list-button'>Truck List</button>
            </Link>
            <Link to="/newlocation">
              <button className="button" data-cy='change-location-button'>Change Location</button>
            </Link>
          </div>
          <div>
            <label 
              className="map-radius-label" 
              htmlFor="set-radius">Set Radius:
            </label>
            <select
              className="map-select-radius" 
              name="radius" 
              id="set-radius"
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              data-cy="set-radius"
            >
            
              <option value="40">All Trucks</option>
              <option value="30">30 miles</option>
              <option value="20">20 miles</option>
              <option value="10">10 miles</option>
              <option value="5">5 miles</option>
              <option value="3">3 miles</option>
              <option value="1">1 mile</option>
            </select>
          </div>
        </div>}
        {loader()}
      </main>
    )
  }

export default React.memo(MapView)