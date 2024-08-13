const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB, then listens for requests
const dbURI = 'mongodb+srv://anadaren:Q0EsS5BeO3gy0xjE@cluster0.ekgpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => console.log('connected to db'), app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


// The .get() and .use() methods below are Middleware,
// it functions similarly to a case switch statement in this context

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));     // translates submitted form into usable data
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});