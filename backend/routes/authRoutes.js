const express = require('express');
const router = express.Router();
const { User } = require('../models/mongo');

// Render login form
router.get('/login', (req, res) => {
    res.render('login.ejs', { error: null });
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login.ejs', { error: 'No user found with that email.' });
        }

        if (user.password !== password) {
            return res.render('login.ejs', { error: 'Invalid password.' });
        }

        res.redirect('/home');
    } catch (error) {
        console.error('Error during login:', error);
        res.render('login.ejs', { error: 'An error occurred. Please try again.' });
    }
});

// Render signup form
router.get('/signup', (req, res) => {
    res.render('signup.ejs', { error: null });
});

// Handle signup form submission
router.post('/signup', async (req, res) => {
    const { user_name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('signup.ejs', { error: 'Passwords do not match.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup.ejs', { error: 'Email is already in use.' });
        }

        const newUser = new User({ user_name, email, password });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error during user registration:', error);
        res.render('signup.ejs', { error: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
