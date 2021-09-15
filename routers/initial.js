const express = require('express');
const userControllers = require('../controllers/user');
const userMiddlewares = require('../middlewares/user');

const router = express.Router();

// ----- POST -----
router.post("/register", userMiddlewares.registerValidation)

module.exports = router;