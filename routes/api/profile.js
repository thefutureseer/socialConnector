const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile model
const Profile = require('../../models/profile');
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


// @route POST api/profile
// description  create users profile.
// @access@Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.handle = req.body.handle;
  }
);


module.exports = router;
