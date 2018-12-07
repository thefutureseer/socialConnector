const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : ''; 
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : ''; 

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 & 4 characters';
  }

  if(Validator.isEmpty(data.handle,)) {
    errors.handle = 'Profile Handle is required';
  }

  if(Validator.isEmpty(data.status,)) {
    errors.status = 'Status field is required';
  }

  if(Validator.isEmpty(data.skills,)) {
    errors.skills = 'skills field is required';
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)) {
      errors.website = "Website not a valid URL";
    }
  }

  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = "not a valid URL";
    }
  }

  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = " not a valid URL";
    }
  }

  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = "facebook not a valid URL";
    }
  }

  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkeedin)) {
      errors.linkedin = "linkedin not a valid URL";
    }
  }

  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = "not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};