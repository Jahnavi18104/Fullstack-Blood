const express = require('express');
const router = express.Router();
const { Donor } = require('../models/donor');

// Render donor registration page
router.get('/donor', (req, res) => {
    res.render('donor.ejs', { error: null, success: null });
});

// Handle donor registration
router.post('/donors/create', async (req, res) => {
    const { name, bloodType, location } = req.body;

    if (!name || !bloodType || !location) {
        return res.render('donor.ejs', { error: 'All fields are required.', success: null });
    }

    try {
        const newDonor = new Donor({ name, bloodType, location });
        await newDonor.save();
        res.render('donor.ejs', { error: null, success: 'Successfully registered as a donor!' });
    } catch (error) {
        console.error('Error during donor registration:', error);
        res.render('donor.ejs', { error: 'There was an error processing your request.', success: null });
    }
});

module.exports = router;
