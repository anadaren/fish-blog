const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware imports
const morgan = require('morgan'); // HTTP request logger middleware
const session = require("express-session"); // session middleware
const MongoStore = require("connect-mongo"); // MongoDB session store
const passport = require("passport"); // authentication middleware

// express app
const app = express();

require('dotenv').config();
require("./config/passport")(passport);

// connect to mongoDB, then listens for requests
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => {
    console.log('✅ connected to db');
    
    // --- START SERVER ONLY AFTER DB CONNECTS ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


// The .get() and .use() methods below are Middleware,
// it functions similarly to a case switch statement in this context

// middleware & static files
app.use(express.urlencoded({ extended: true}));     // translates submitted form into usable data
app.use(morgan('dev')); // logs requests to console
app.use(express.static('public'));

// express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "fishsecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, collectionName: 'sessions' })
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make req.user available in all views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// routes

// auth routes
app.use('/', authRoutes); // changed from '/auth' to '/'

// blog routes
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});