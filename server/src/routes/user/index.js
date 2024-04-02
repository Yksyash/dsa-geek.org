const express = require('express');
const router = express.Router();

const signup = require('./signup')
const login = require('./login')
const run = require('./run')
const submit = require('./submit')
const viewSubmissions = require('./viewSubmissions')

router.use('/signup', signup);
router.use('/run-code', run )
router.use('/login', login);
router.use('/submit', submit);
router.use('/viewSubmissions', viewSubmissions);

module.exports = router;