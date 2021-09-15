const express = require('express');
const contactControllers = require('../controllers/contact');
const contactMiddlewares = require('../middlewares/contact');

const router = express.Router();

// ----- GET -----
router.get("/",contactControllers.getContacts)

// ----- POST -----

// ----- PUT -----

// ----- DELETE -----


module.exports = router;