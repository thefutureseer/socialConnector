const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const gravatar = require('gravatar');


const app = express();

//body parser middleware 2 peices
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo DB
mongoose
.connect(db)
.then(()=> console.log('mongoDB connected'))
.catch(err=> console.log(err));

// USe routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//passport middleware
app.use(passport.initialize());
// passport config with jwt strategy
require('./config/passport.js')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on Port ${port}`) );