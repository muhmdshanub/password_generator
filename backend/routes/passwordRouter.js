// routes/passwordRouter.js

const express = require('express');
const router = express.Router();
const { getPassword } = require('../controllers/passwordController');
const validate = require('../middlewares/validationMiddleware.js');
const {validatePasswordParams} = require('../validators/passwordValidator.js')

// Define the route for getting a password
router.get('/generate', validatePasswordParams, validate, getPassword);

module.exports = router;
