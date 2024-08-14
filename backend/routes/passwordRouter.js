// routes/passwordRouter.js

const express = require('express');
const router = express.Router();
const { getPassword } = require('../controllers/passwordController');

// Define the route for getting a password
router.get('/generate', getPassword);

module.exports = router;
