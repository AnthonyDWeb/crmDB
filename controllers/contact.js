const {validationResult} = require('express-validator');
const {Contact} = require('../models/contact');

// ----- GET -----
const getContacts = async(req, res) =>{
    try {
        let contacts = await Contact.find();
        res.status(200).json({
            status: "success",
            data: contacts
        })
    } catch (error) {
        res.status(401).json({
            message: "error detected",
        })
    }
}

// ----- POST -----
const newContact = async(req, res) => {
    try {
        Contact.create(req.body);
        res.status(201).json({
            message: `${req.body.name} is created as a contact`
        })
    } catch (error) {
        res.status(401).json({
            message: "error detected",
        })
    }
}
// ----- PUT -----

// ----- DELETE -----

module.exports = {
    getContacts,
    newContact
}