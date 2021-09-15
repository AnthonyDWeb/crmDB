const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {User} = require('../models/user');

// ---- POST -----
const register = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({
            message: "error(s) detected",
            errors: errors.array()
        });
        return;
    };

    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        User.create({
            email: req.body.email,
            password: hashedPassword
        });
    } catch (error) {
        return res.status(400).json({
            messages: `${req.body.email} already exist`
        })
    }

    res.status(201).json({
        success: true,
        message: `user created with this email: ${req.body.email}`
    })
}

module.exports = {
    register: register
}