import React, { Component } from 'react'

class Landing extends Component {
  render () {
    return (
      <div className="landing">
       <div className="dark-overlay landing-inner text-light">
        <div className="container">
         <div className="row">
          <div className="col-md-12 text-center">
           <h1 className="display-3 mb-4"> Social Media for the community
           </h1>
           <p className="lead"> Choose to create a profile, portfolio of awarness, 
           share posts and get help from other crackers</p>
           <hr />
           <a href="register.html" className="btn btn-lg btn-info mr-2"> No sign up unless you insist</a>
           <a href="login.html" className="btn btn-lg btn-light"> No login unless you insist</a>
          </div>
         </div>
        </div>
       </div>
      
      </div>
    )
  }
}

export default Landing;