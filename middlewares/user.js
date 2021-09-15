const {body} = require('express-validator');
const password = require("password-validator");

const registerValidation =  [
    body("email").notEmpty().isEmail().isEmail().normalizeEmail(),
    body("password").notEmpty().custom( userPassword =>{
        const userPasswordSchema = new password();
        userPasswordSchema.is().min(6)
        userPasswordSchema.has().isInt().min(1)

        return userPasswordSchema.validate(userPassword)
    })
];

module.exports = {
    registerValidation: registerValidation
}