const express = require('express');
const {protect} = require('../controllers/user')
const contactControllers = require('../controllers/contact');
const contactMiddlewares = require('../middlewares/contact');

const router = express.Router();

// ----- GET -----
router.get("/", protect, contactControllers.getContacts)

// ----- POST -----
router.post("/", protect, contactControllers.newContact)

// ----- PUT -----

// ----- DELETE -----


module.exports = router;