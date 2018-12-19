import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
           <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center"> No Sign Up </h1>
            <p className="lead text-center">
             Create your profile
            </p>
            <form action="create-profile.html">
             <div className="form-group">
              <input
               type="text"
               className="form-control form-control-lg"
               placeholder="Name"
               name="name"
               required
               />
             </div>
             <div className="form-group">
               <input type="email" className="form-control form-control-lg" placeholder="Email Address"
               name="email" />
               <small className="form-text text-muted"> Use a gravatar email if you want a profile image.</small>
             </div>
             <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password"
              name="password" />
             </div>
             <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" 
              name="password2" />
             </div>
             <input type="submit" className="btn btn-info btn-block mt-4"  />
            </form>
           </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;