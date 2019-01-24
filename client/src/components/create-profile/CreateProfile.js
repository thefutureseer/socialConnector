import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//import InputGroup from '../common/InputGroup';
//import SelectListGroup from '../common/SelectListGroup';
    
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };
  }    
/*
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('submit');
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
*/
  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
       <div className="container">
        <div className="row">
         <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Create a profile</h1>
          <p className="lead text-center">
            Make your profile stand out!
          </p> 
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
           <TextFieldGroup 
             placeholder="* Profile Handle"
             name="handle"
             value={this.state.handle}
             onChange={this.onChange}
             errors={errors.handle}
             info="A unique handle for your profile URL. Your full name, company name, nickname"
           />
          </form>
         </div>
        </div>
       </div>  
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);