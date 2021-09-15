const jwt = require('jsonwebtoken');
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
            errors: error
        })
    }
}

// ----- POST -----

// ----- PUT -----

// ----- DELETE -----

module.exports = {
    getContacts
}