const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

//load user model
const User = require('../../models/User')

//@route GET api/users/test
//@desc (discription) Tests users route
//@access Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

//@route GET api/users/register
//@desc (discription) register users 
//@access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if(user) {
      return res.status(400).json({ email: 'already exists'});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'g', //rating
        d: 'mm' //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //bcrypt.js to generate salt get hash for encryption and send new User back to us as json
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        })
      })
    }
  });
});

//@route GET api/users/login
//@desc (discribe) Login user / return JWT (json web token) token
//@access Public 
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({email})
   .then(user => {
     //check for user
     if(!user) {
       return res.status(404).json({email: 'User or email not found'});
     }

//check password
     bcrypt.compare(password, user.password).then(isMatch=> {
       if(isMatch) {
         res.json({msg: 'Success!'}); 
       } else {
         return res.status(400).json({password: 'Password incorrect'});
       }
     })
   });
});


module.exports = router;