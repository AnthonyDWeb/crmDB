const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "_id"},
    name: String,
    email: String,
    description: String,
    categorie: String
});
const Contact = mongoose.model("Contat", ContactSchema);

module.exports = Contact;
