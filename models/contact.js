const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    name: String,
    email: String,
    description: String,
    category: String
});
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = {Contact: Contact};
