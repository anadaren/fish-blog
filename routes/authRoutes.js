const express = require('express');
const passport = require('passport');
const User = require('../models/user.js');
const router = express.Router();




// Register account
router.post('/register', async (req, res) => {
    console.log("Register form submitted:", req.body);
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

// Login account
router.post('/login', passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login'
}));

// Logout account
router.get('/logout', (req, res) => {
    console.log("Login attempt:", req.body);
    req.logout(() => {
        res.redirect('/login');
    });
});

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { title: "Login" });
});

// GET register page
router.get('/register', (req, res) => {
  res.render('register', { title: "Register" });
});



module.exports = router;