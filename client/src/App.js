import React, { Component } from 'react';

import Navbar from './components/layout/Navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navbar />
       <h1>Dans New One</h1>
      </div>
    );
  }
}

export default App;
