const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The email exist!'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.hashPass(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Email not exist!'));
    } if (!user.comparePass(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect password'));
    }
    done(null, user);
}));