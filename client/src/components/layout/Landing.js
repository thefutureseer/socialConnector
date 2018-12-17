import React, { Component } from 'react'

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
           <p className="lead">{' '} Awareness, community and band-aids</p>
           <hr />
           <a href="register.html" className="btn btn-lg btn-info mr-2"> No sign up</a>
           <a href="login.html" className="btn btn-lg btn-light"> No login</a>
          </div>
         </div>
        </div>
       </div>
      
      </div>
    )
  }
}

export default Landing;