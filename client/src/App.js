import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import store from ('./store');

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


import './App.css';

const store = createStore(() => [], {}, applyMiddleware());

class App extends Component {
  render() {
    return (
    <Provider store={ store }> 
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
