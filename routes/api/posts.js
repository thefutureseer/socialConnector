const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

//Profile model
const Profile = require('../../models/Profile');

// validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//desc(discription) test post route
//@access public
router.get('/test', (req, res) => res.json({msg: "posts works"}));

//route: GET api/posts
//desc get posts
//access public
router.get('/', (req, res) => {
  Post.find()
  .sort({ date: -1 })
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'no posts found' }));
});

//route GET api/posts/:id
//desc get posts by id
//access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => 
    res.status(404).json({ nopostfound: 'no post found with that id' })
  );
});


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

//route DELETE api/posts/:id
//desc delete the post
//access private
router.delete(
  '/:id', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
//check for post owner
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'user not authorized' });
      }

//DELETE 
      post.remove().then(() => res.json({ success: true}));
    })
    .catch(err => res.status(404).json({ postnotfound: 'no post found'}));
  })
});

// route POST api/posts/like/:id
//desc like post
//access public
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
           .length > 0
        ) {
          return res
           .status(400)
           .json({ alreadyliked: 'user already liked this post' });
        }
//add user id to the likes array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    });
  }
);


module.exports = router;