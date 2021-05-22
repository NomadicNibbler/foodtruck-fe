import Header from './Header/Header';
import MapView from './MapView/MapView';
import TruckDetails from './TruckDetails/TruckDetails';
import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Form from './Form/Form';
import { fetchUserName, fetchNewUser, fetchTrucks } from '../apiCalls.js';
import TruckList from './TruckList/TruckList';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      userLocation: {}, 
      radius: 5,
      trucks:[],
      error:''
    }
  }
  
  loginUser = (userName) => {
    fetchUserName(userName)
    .then(data => {
      // console.log(data)
      const id = data.data.id
      fetchTrucks(id)
      .then(trucks => {
        // console.log(trucks)
        const sortedTrucks = this.sortByDistance(trucks.data)
        this.setState({ userLocation: {lat: 42.346251, lng: -71.09817}, trucks: sortedTrucks})
      })
    })
    .catch(error => this.setState({ error: error.message }))
  }

  sortByDistance = (trucks) => {
    const sortedTrucks = trucks.sort((a, b) => a.attributes.distance - b.attributes.distance)
    return sortedTrucks
  }

  createNewUser = (userName, first, last, address, city, zip) => {
    const newUser = {
      username: userName, 
      first_name: first, 
      last_name: last, 
      address: address, 
      city: city, 
      zipcode: zip
    }
    fetchNewUser(newUser)
    .then(data => console.log('userData', data))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login'/>
          </Route>
          <Route exact path='/login'>
            <Form 
              loginUser={this.loginUser} error={this.state.error}
            />
          </Route>
          <Route exact path="/newuser">
            <Form
              createNewUser={this.createNewUser} error={this.state.error}
            />
          </Route>
          <Route exact path="/newlocation">
            <Form error={this.state.error}/>
          </Route>
          <Route exact path="/trucklist">
            <TruckList truckList={this.state.trucks} sortByDistance={this.sortByDistance}/>
          </Route>
          <Route exact path="/map">
    
            <MapView
              trucks={this.state.trucks}
              center={this.state.userLocation}
              showTruckDetails={this.showTruckDetails}
            />
          </Route> 
          <Route  exact path="/trucks/:name" render={({ match }) => {
            const clickedTruck = this.state.trucks.find(truck => {
              const truckName = match.params.name.split('_').join(' ')
              return truckName === truck.attributes.name
            })
           
             return <TruckDetails 
                      truckDetails={clickedTruck}
                    />
          }}/>
         
        </Switch>
      </div>
    );
  } 
}

export default App;
