const {validationResult} = require('express-validator');
const {Contact} = require('../models/contact');

// ----- GET -----
const getContacts = async(req, res) =>{
     if(req.query !== {}){     
            try {
                    let key = Object.keys(req.query)[0];        
                    let value = Object.values(req.query)[0]; 
                    let contacts = await Contact.findOne({[key]: value});
                    return res.status(200).json({
                        status: "success",
                        data: contacts
                    })
                } catch (error) {
                    return res.status(401).json({
                        message: "error detected",
                    })
                }
        }

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
// const newContactName = async(req, res) =>

// ----- DELETE -----

module.exports = {
    getContacts,
    newContact
}