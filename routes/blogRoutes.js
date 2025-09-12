const express = require('express');
const passport = require('passport');
const blogController = require('../controllers/blogController.js')
const User = require('../models/user.js');

const { ensureAuth, ensureAdmin } = require("../middleware/auth");


const router = express.Router();

// display all blogs, in reverse order
router.get('/', blogController.blog_index);

// logs submitted form into database
// post request
router.post('/', blogController.blog_create_post);

// renders the create a new blog page
// needs to be above the /:id commant
// get request
router.get('/create',  ensureAuth, blogController.blog_create_get);

// blog details
router.get('/:id',  ensureAuth, blogController.blog_details);

// delete a blog
router.delete('/:id',  ensureAuth, blogController.blog_delete);

// Display register  form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register account
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

// Display login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login redirect
router.post('/login', passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login'
}));

// Logout account
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});


// export router back to app.js
module.exports = router;