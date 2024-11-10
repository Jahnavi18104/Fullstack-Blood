const express = require('express');
const router = express.Router();
const { Recipient } = require('../models/recipient');

// Render recipients page
router.get('/recipient', (req, res) => {
    res.render('recipients.ejs');
});

// Handle recipient registration
router.post('/recipients/create', async (req, res) => {
    const { name, bloodType, location } = req.body;

    if (!name || !bloodType || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newRecipient = new Recipient({ name, bloodType, location });
        await newRecipient.save();
        res.status(200).json({ message: 'Successfully registered as a recipient!' });
    } catch (error) {
        console.error('Error during recipient registration:', error);
        res.status(500).json({ error: 'There was an error processing your request.' });
    }
});

module.exports = router;
