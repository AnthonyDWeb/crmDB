// const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {Contact} = require('../models/contact');

// ----- GET -----
const getContacts = async(req, res) =>{
     if(Object.keys(req.query).length !== 0){
            try {
                    let key = Object.keys(req.query)[0]; 
                    let value = Object.values(req.query)[0]; 
                    let myContacts = await Contact.find({
                        userId : req.cookies.jwtData.id,
                        [key]: value
                    });
                    return res.status(200).json({
                        status: "success1",
                        data: myContacts
                    })
                } catch (error) {
                    return res.status(401).json({
                        message: "error detected2",
                        error: error
                    })
                }
        }

    try {
        let contacts = await Contact.find( {userId : req.cookies.jwtData.id});
        return res.status(200).json({
            status: "success2",
            data: contacts
        })
    } catch (error) {
        return res.status(401).json({
            message: "error detected1",
        })
    }
}

// ----- POST -----
const newContact = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({
            message: "error(s) detected",
            errors: errors.array()
        });
        return;
    };
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
const setContact = async(req, res) => {
    try {
                let key = Object.keys(req.query)[0];        
                let value = Object.values(req.query)[0]; 
                let contacts = await Contact.findOneAndUpdate(
                    { name: req.params.name},  
                    { $set : {[key]: value} },
                    {new: true}
                );
               
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

// ----- DELETE -----
const deleteContact = async(req, res) => {
    let myUserId = req.cookies.jwtData.id;
        try {
            let contacts = await Contact.findOneAndRemove({
                userId: myUserId,
                _id: req.params.id
            });
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

module.exports = {
    getContacts,
    newContact,
    setContact,
    deleteContact
}