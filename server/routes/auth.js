const express = require("express");

const router = express.Router();

const func=require('../controllers/auth')



router.post('/register',func.register);

module.exports = router;
