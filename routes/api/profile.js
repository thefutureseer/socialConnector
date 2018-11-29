const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load profile model
const Profile = require('../../models/profile');
//load user profile
const User = require('../../models/User');

// @route GET api/profile/test
// description test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "profile works"}));

// @route GET api/profile/profile
// description  get current users profile
// @access Private
router.get('/', passport.authenticate('JWT', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
   .then(profile => {
     
   })
});


module.exports = router;
