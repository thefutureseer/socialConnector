const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('extract-jwt').ExtractJwt;
const mongoose = require('mongoose';
const User = mongoose.model('users');
const keys = require('../config/keys');

const opt = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload):
  }));
};
