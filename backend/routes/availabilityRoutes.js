const express = require('express');
const router = express.Router();
const { Donor } = require('../models/donor');

// Render blood availability page
router.get('/availability', (req, res) => {
    res.render('bloodAvailability.ejs');
});

// Handle blood availability check
router.get('/availability/check', async (req, res) => {
    const { bloodType } = req.query;

    if (!bloodType) {
        return res.status(400).json({ error: 'Blood type is required.' });
    }

    try {
        const donor = await Donor.aggregate([
            { $match: { bloodType } },
            { $group: { _id: "$bloodType", availableUnits: { $sum: 1 } } }
        ]);

        if (donor.length === 0) {
            return res.status(404).json({ error: 'No donors found with the specified blood type.' });
        }

        const availableUnits = donor[0].availableUnits;
        res.status(200).json({ availableUnits });
    } catch (error) {
        console.error('Error checking blood availability:', error);
        res.status(500).json({ error: 'There was an error processing your request.' });
    }
});

module.exports = router;
