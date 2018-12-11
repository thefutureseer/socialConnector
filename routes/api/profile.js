const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

//load profile model
const Profile = require('../../models/Profile');
//load user model
const User = require('../../models/User');

// @route GET api/profile/test
// description test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

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

// @route POST api/profile/experience
// description add experience to profile
// @access Private

router.post(
  '/experience', 
  passport.authenticate('jwt',{ session: false }), (req, res) => {
   const { errors, isValid } = validateExperienceInput(req.body);

  //check validation
  if(!isValid) {
//Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
 //add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
 }
);

// @route POST api/profile/education
// description add education to profile
// @access Private

router.post('/education', passport.authenticate('jwt',{ session: false }), (req, res) => {
  const { errors, isValid} = validateEducationInput(req.body);

  //check validation
      if(!isValid){
  //Return any errors with 400 status
        return res.status(400).json(errors);
      }

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
 //add to edu array
    profile.education.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  });
 }
);

// @route POST api/profile/experience/:exp_1
// description delete experience from profile
// @access Private

router.delete(
  '/experience/:exp_id', 
  passport.authenticate('jwt',{ session: false }), 
  (req, res) => {

   Profile.findOne({ user: req.user.id }).then(profile => {
 //   Get remove index ,higher order method "map"
   const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id );

 // splice out of array
   profile.experience.splice(removeIndex, 1);

 // save
   profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/education/:edu_1
// description delete education from profile
// @access Private
router.delete(
  '/education/:edu_id', 
  passport.authenticate('jwt',{ session: false }), 
  (req, res) => {

   Profile.findOne({ user: req.user.id }).then(profile => {
 //   GET/remove index
   const removeIndex = profile.education
 //higher order method "map"
    .map(item => item.id)
    .indexOf(req.params.edu_id );

 // splice out of array
   profile.education.splice(removeIndex, 1);

 // save
   profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// description delete user and profile
// @access Private
router.delete(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Profile.findOneAndRemove({ user: req.body.id }).then(() => {  
      User.findOneAndRemove({ _id: req.user.id }).then(() => 
        res.json({ success: true })
      );
    });
  }
);



module.exports = router;