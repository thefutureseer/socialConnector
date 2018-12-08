const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/profile');

//load profile model
const Profile = require('../../models/Profile');
//load user profile
const User = require('../../models/User');

// @route GET api/profile/test
// description test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "profile works"}));

// @route GET api/profile
// description  get current users profile. need to be loged in to do so
// @access@Private
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
   const errors = {};

    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      } 
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/all
// description get all profiles .find
// @access Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noprofiles = "There are no profiles";
      return res.status(404).json(errors);
    }
    res.json(profiles);
  })
  .catch(err =>
    res.status(404).json({ profile: 'There are no profiles.' }));
});

// @route GET api/profile/handle/ :handle(actual handle) gets hit by frontend, not actually used by user.
// description  GET profile by handle. 
// @access@Public no passport middleware, don't have to be logedin to see profiles
//use Profile model findone by handle. get handle from url by req.params.handle
//when get the profile populate it with user stuff populate'user''name', 'avatar'
//catch promise with THEN, check if profile with that handle, errors if no profile

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for user';
      res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/ :user_id (actual handle) gets hit by frontend, not actually used by client.
// description  GET profile by user. 
// @access@Public no passport middleware, don't have to be logedin to see profiles
//use Profile model findone by user. get user from url by req.params.user_id
//when get the profile populate it with user stuff populate'user''name', 'avatar'
//catch promise with THEN, check if profile with that handle, errors if no profile

router.get('/user/:user_id', (req, res) => {
  const errors = {};
  
  Profile.findOne({ user: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for user';
      res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => 
    res.status(404).json({ profile :'There is no profile for this user.'})
    );
});




// @route POST api/profile
// description  create -edit users profile.
// @access@Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid} = validateProfileInput(req.body);

    //check validation
    if(!isValid){
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills - split into array
    if(typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
     .then(profile => {
       if(profile) {
    //update
         Profile.findOneAndUpdate(
           { user: req.user.id}, 
           { $set: profileFields }, 
           { new: true}
          ).then(profile => res.json(profile));
       } else {
    //create
    //check if handle exists
         Profile.findOne({handle: profileFields.handle}).then(profile => {
           if(profile) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
           }
    //save profile
           new Profile(profileFields).save().then(profile => res.json(profile));
         });
        }
     });
  }
);

module.exports = router;
