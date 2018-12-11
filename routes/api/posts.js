const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//desc(discription) test post route
//@access public
router.get('/test', (req, res) => res.json({msg: "posts works"}));

//route: POST api/posts
//desc: create post
//access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

// Check validation
  if(!isValid) {
// if any errors, send 400 with errors object
  return res.status(400).json(errors);
 }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name,
    user: req.user.id
  });
//save, then give the post  
  newPost.save().then(post => res.json(post));
});

module.exports = router;