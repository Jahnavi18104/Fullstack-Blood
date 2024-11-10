const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    contact: String,
    bloodGroup: String,
    email: String,
    gender: String,
    address: String,
    lastDonationDate: Date
});

const Donor = mongoose.model("Donor", donorSchema);

module.exports = { Donor };
