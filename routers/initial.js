const express = require('express');
const userControllers = require('../controllers/user');
const userMiddlewares = require('../middlewares/user');

const router = express.Router();

// ----- POST -----
router.post("/register", userMiddlewares.registerValidation(), userControllers.register);
router.post("/login", userControllers.login)

module.exports = router;