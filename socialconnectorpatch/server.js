const express = require("express");
const mongoose = require("mongoose");

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo DB
mongoose.connect(db).then(()=> console.log('mongoDB connected')).catch(err=> console.log(err));

// USe routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server running on Port ${port}`) );

app.get('/', (req, res) => res.send('Hello World!'));