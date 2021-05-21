import Header from './Header/Header';
import MapView from './MapView/MapView';
import { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import user from  "../mockuser.js";
import Form from './Form/Form';
import { fetchUserName, fetchNewUser, fetchTrucks } from '../apiCalls.js'
import TruckList from './TruckList/TruckList';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      lat: 0, 
      lng: 0, 
      truckList: [],
      radius: 5,
      trucks:[],
      error:''
    }
  }
  
  // this will change to a method later when we connect the user form
  componentDidMount() {
    const lat =  Number(user.data.attributes.lat)
    const lng = Number(user.data.attributes.long)
    const truckList = this.createLocationList(user)
    this.setState({ lat: lat, lng: lng, truckList:[...this.state.truckList, ...truckList ] })
  }

  loginUser = (userName) => {
    fetchUserName(userName)
    .then(data => {
      console.log('user', data.data)
      const id = data.data.id
      fetchTrucks(id)
      .then(trucks => {
        console.log('trucks', trucks.data)
        const closestTrucks = this.filterByDistance(trucks.data)
        this.setState({ trucks: closestTrucks})
      })
    })
    .catch(error => this.setState({ error: error.message }))
  }

  filterByDistance = (trucks) => {
    return trucks.sort((a, b) => a.attributes.distance - b.attributes.distance)
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

  createLocationList = (user)  => {
    const trucks = user.data.attributes.trucks
    const truckList = trucks.map(truck => {
      return {lat: Number(truck.lat), lng: Number(truck.long) }
    });
    return truckList
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
            <TruckList truckList={this.state.trucks}/>
          </Route>
          <Route exact path="/map">
            <MapView
              truckList={this.state.truckList}
              center={{lat: this.state.lat, lng: this.state.lng}}
            />
          </Route>
          <Route exact path='/trucks/:name'></Route>
          <Route render={() => <Link to='/'><h2> 404: You must be lost. Please click me</h2></Link>} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
