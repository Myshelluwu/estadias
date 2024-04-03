const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/users');

module.exports = function (passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
    
    
    // Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        try {
            const user = await User.findOne({'local.email': email});
            if (user) {
                return done(null, false, req.flash('signupMessage', 'El correo ya ha sido usado.'));
            } else {
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                await newUser.save();
                return done(null, newUser);
            }
        } catch (err) {
            return done(err);
        }
    }));

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        try {
            const user = await User.findOne({'local.email': email});
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'El correo no se ha encontrado.'));
            }
            if (!user.validatePassword(password)) {
                return done(null, false, req.flash('loginMessage', 'La contraseña es incorrecta.'));
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
};
