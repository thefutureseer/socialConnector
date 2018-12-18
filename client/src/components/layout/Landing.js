import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render () {
    return (
      <div className="landing">
       <div className="dark-overlay landing-inner text-light">
        <div className="container">
         <div className="row">
          <div className="col-md-12 text-center">
           <h1 className="display-3 mb-4"> Fun for everyone
           </h1>
           <p className="lead">
           {' '} 
           Awareness, community and band-aids
           </p>
           <hr />
           <Link to="/register" className="btn btn-lg btn-info mr-2"> No sign up</Link>
           <Link to="/login" className="btn btn-lg btn-light"> No login</Link>
          </div>
         </div>
        </div>
       </div>     
      </div>
    )
  }
}

export default Landing;