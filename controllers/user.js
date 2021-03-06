const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {User} = require('../models/user');

// ----- GET -----
const protect = async(req, res, next) => {
    try {
        const data = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.cookies.jwtData = data;
        next();
    } catch (error) {
        return res.status(401).json({
			message: "Your token is not valid",
		});  
    }
}

// ---- POST -----
const register = async(req, res) => {
    // check if user information is correct
    const errors = await validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            message: "error(s) detected",
            errors: errors.array()
        });
    };
    
    const {password} = req.body;
    // password will be hash
    const hashedPassword = await bcrypt.hash(password, 12)
    // Save user into DB
    const userEmail = await User.find({email: req.body.email}); 
    if( userEmail.length === 0 ){
        try {
        // const user = await User.find(); 
        // console.log(("user", user));
        console.log(("userEmail", userEmail));
            console.log('register is Ok !');
            User.create({
                email: req.body.email,
                password: hashedPassword
            });
            res.status(201).json({
                success: true,
                message: `user created with this email: ${req.body.email}`
            })
        } catch (error) {
            return res.status(400).json({
                messages: `error detected`
            })
        }
        
    }
    return res.status(400).json({
        messages: `${req.body.email} already exist`
    })
};

const login = async(req, res) => {
    const { email, password } = req.body;

        // check if user already exist
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: "Invalid email"
            });
        }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    // create token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    console.log("token id",token);
    
    // create cookie
    res.cookie("jwt", token, { httpOnly: true, secure: false});
    res.status(200).json({
        success: true,
        message: `${req.body.email} is login`
    })
};

const logout = async(req, res) => { 
    try {
        res.clearCookie('jwt');
        // res.redirect('/');
        res.json({
            message: "you're logout"
        })
    } catch (error) {
        res.json({
            message: "error in deconection"
        })
    }
};

module.exports = {
    protect: protect,
    register: register,
    login: login,
    logout: logout
}