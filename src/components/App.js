import Header from './Header/Header';
import MapView from './MapView/MapView';
import TruckDetails from './TruckDetails/TruckDetails';
import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Form from './Form/Form';
import { fetchUserName, fetchNewUser, fetchTrucks, updateUser } from '../apiCalls';
import { setUserData } from '../utility'
import TruckList from './TruckList/TruckList';

class App extends Component {
  constructor() {
    super() 
    this.state = JSON.parse(localStorage.getItem('state')) 
    ? JSON.parse(localStorage.getItem('state'))
    : {
      userId: '',
      userLocation: {}, 
      trucks:[],
      error:'',
      newUserError: ''
    }
  }

  clearError = () => {
    this.setState({ error: '' })
    this.setState({ newUserError: '' })
  }
  
  loginUser = (userName) => {
    fetchUserName(userName)
    .then(data => {
      console.log(data)
      const id = data.data.id
      fetchTrucks(id)
      .then(trucks => {
        console.log(trucks)
        const formattedData = setUserData(data, trucks)
        this.setState({userId: id, userLocation: {lat: formattedData.lat, lng: formattedData.lng}, trucks: formattedData.trucks}, () => {
          localStorage.setItem('state', JSON.stringify(this.state))
        })
      })
    })
    .catch(error => {
      this.setState({ error: error.message })
    })
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
    .catch(error => {
      this.setState({ newUserError: error.message})
    })
  }

  updateLocation = (address, city, zip) => {
    const updatedUser = {
      id: this.state.userId, 
      address: address, 
      city: city, 
      zipcode: zip
    }
    updateUser(updatedUser, this.state.userId)
    .then(data => {
      fetchTrucks(this.state.userId)
      .then(trucks => {
        const formattedData = setUserData(data, trucks)
        this.setState({...this.state, userLocation: {lat: formattedData.lat, lng: formattedData.lng}, trucks: formattedData.trucks}, () => {
          localStorage.setItem('state', JSON.stringify(this.state))
        })
      })
      .catch(error => this.setState({error: error.message}))
    })
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
              loginUser={this.loginUser} error={this.state.error} clearError={this.clearError} newUserError={this.state.newUserError}
            />
          </Route>
          <Route exact path="/newuser">
            <Form
              createNewUser={this.createNewUser} newUserError={this.state.newUserError} clearError={this.clearError} error={this.state.error}
            />
          </Route>
          <Route exact path="/newlocation">
            <Form 
              error={this.state.error}
              updateLocation={this.updateLocation} clearError={this.clearError}
            />
          </Route>
          <Route exact path="/trucklist">
            <TruckList truckList={this.state.trucks} sortByDistance={this.sortByDistance}/>
          </Route>
          <Route exact path="/map">
    
            <MapView
              trucks={this.state.trucks}
              center={this.state.userLocation}
              showTruckDetails={this.showTruckDetails}
              error={this.state.error}
              clearError={this.clearError}
            />
          </Route> 
          <Route  exact path="/trucks/:name" render={({ match, history }) => {
            const clickedTruck = this.state.trucks.find(truck => {
              const truckName = match.params.name.split('_').join(' ')
              return truckName === truck.attributes.name
            })
           
             return <TruckDetails 
                      truckDetails={clickedTruck}
                      history={history}
                    />
          }}/>
         
        </Switch>
      </div>
    );
  } 
}

export default App;
