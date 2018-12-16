import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className = "navbar navbar-expand-sm navbar-dark bg-dark mb-4">
         <div className = "container">
          <a className = "navbar-brand" href = "landing.html">SocialConnectors</a>
          <button className = "navbar-toggler" type = "button" data-toggle = "collapse" data-target = "#mobile=nav">
           <span className = "navbar-toggler-icon"></span>
          </button>

          <div className = "collapse navbar-collapse" id = "mobile-nav">
            <ul className = "navbar-nav mr-auto">
             <li className = "nav-item">
              <a className = "nav-link" href = "profiles.html"> Media
              </a>
             </li>
            </ul>

            <ul className = "navbar-nav ml-auto">
             <li className = "nav-item">
              <a className = "nav-link" href = "register.html"> No sign Up but..</a>
             </li>
             <li className = "nav-item">
              <a className = "nav-link">No Login but..</a>
             </li>
            </ul>

          </div>
         </div>
        </nav>

      </div>
    )
  }
}

export default Navbar;


