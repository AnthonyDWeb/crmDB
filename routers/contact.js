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
router.put("/:name", protect, contactControllers.setContact)

// ----- DELETE -----
router.delete("/:name", protect, contactControllers.deleteContact)

module.exports = router;