const passport = require('passport');
const configPassportGoogleOAuth = require('../middlewares/googleOAuth.cjs');
const authController = require('../controllers/loginController.cjs');
const express = require('express');
const path = require('path');
const router = express.Router();
const sessionGoogleOAuth = require('../../infrastructure/middlewares/sessionOAuth.cjs');  

configPassportGoogleOAuth(passport)



router.get('/auth/google', sessionGoogleOAuth, passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/calback', sessionGoogleOAuth, (req, res, next) => authController.googleAuthCallback(req, res, next));


module.exports = router;