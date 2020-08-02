const { Router, response } = require('express');
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
require('dotenv').config();
const verify = require('./verifyToken');

//--------------SIGNUP

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        status: true,
    });
});


router.post('/signin', async (req, res, next) => {
    passport.authenticate('signin', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    status: false,
                    error: req.flash('signinMessage')[0]
                });
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({
                    _id: req.user._id,
                    email: req.user.email
                }, process.env.TOKEN_SECRET);
                //Send back the token to the user
                return res.json({
                    status: true,
                    email: req.user.email,
                    id: req.user._id,
                    token: token
                });
            });
        } catch (error) {
            return res.json({
                status: false,
                error: req.flash('signinMessage')[0]
            });
        }
    })(req, res, next);
});

router.post('/hasToken', verify, (req, res) => {
    res.json({
        status: true,
        email: req.user.email
    });
});

module.exports = router;