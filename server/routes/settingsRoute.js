const express = require('express');
const router = express.Router();
const { changePassword, changeName, changeLastName } = require('../controllers/settingsController');



// Route to change name
router.post('/changeName',  changeName);

// Route to change last name
router.post('/changeLastname', changeLastName);

// Route to change password
router.post('/changePassword', changePassword);

module.exports = router;
