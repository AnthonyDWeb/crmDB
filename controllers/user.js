const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
};

const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password 1"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password 2"
        });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    
    res.cookie("jwt", token, { httpOnly: true, secure: false});

    res.status(200).json({
        success: true,
        message: `${req.body.email} is login`
    })
}

module.exports = {
    register: register,
    login: login
}