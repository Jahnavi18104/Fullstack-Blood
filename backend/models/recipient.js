const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
    name:String,
    bloodGroup:String,
    hospitalName:String,
    contact:String
});

const Recipient = mongoose.model("Recipient", recipientSchema);

module.exports = { Recipient };

