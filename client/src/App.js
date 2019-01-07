import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

//Check for token
if (localStorage.jwtToken) {
//Set auth token header auth
  setAuthToken(localStorage.jwtToken);
//Decode Token and get user info and experation
  const decoded = jwt_decode(localStorage.jwtToken);
//Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

//check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
//logout user
   store.dispatch(logoutUser());
//TODO:clear current profile
   window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
            <Route exact path="/Register" component={ Register } />
            <Route exact path="/Login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider> 
    );
  }
}

export default App;
