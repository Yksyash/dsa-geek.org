const express = require('express');
const router = express.Router();

const addQuestion = require('./addQuestion')
const login = require('./login');

router.use('/addQuestion', addQuestion);
router.use('/login' , login )

module.exports = router;