const {signup, login}  = require('../Controllers/Authcontroller.js')
const {signupvalidation, loginvalidation} = require('../Middlwares/Authvalidatiion')

const router = require('express').Router();

router.post("/login",loginvalidation,login)
router.post('/signup', signupvalidation ,signup)
 
  module.exports= router