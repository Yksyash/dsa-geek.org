const express = require('express');
const router = express.Router();

const getQuestions = require('./getQuestions')
const logout = require('./logout')

router.use('/questions', getQuestions);
router.use('/logout', logout);

module.exports = router;