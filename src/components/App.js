import Header from './Header/Header'
import MapView from './MapView/MapView';
import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import user from  "../mockuser.js"
import Form from './Form/Form';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      lat: 0, 
      lng: 0, 
      truckList: [],
      radius: 5,
    }
  }
  
  // this will change to a method later when we connect the user form
  componentDidMount() {
    const lat =  Number(user.data.attributes.lat)
    const lng = Number(user.data.attributes.long)
    const truckList = this.createLocationList(user)
    this.setState({lat: lat, lng: lng, truckList:[...this.state.truckList, ...truckList ]})
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
              <Form />
            </Route>
            <Route exact path="/newuser">
              <Form/>
            </Route>
            <Route exact path="/location">
              <Form/>
            </Route>
            <Route exact path="/trucklist">
              <h2>Truck List</h2>
            </Route>
            <Route exact path="/map">
              <MapView
                truckList={this.state.truckList}
                center={{lat: this.state.lat, lng: this.state.lng}}
              />
            </Route>
          </Switch>
      </div>
    );
  }
  
}

export default App;
