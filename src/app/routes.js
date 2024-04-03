//const express = require('express');
//const app = express();
//const passport = require("passport");

module.exports = function (app, passport){

    app.get('/', (req,res) => {
        res.render('index');  // carga el index.ejs
    });

    app.get('/login', (req,res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/signup', (req,res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });
    
    app.get('/profile/student', isLoggedIn, (req, res) => {
        res.render('profile/student', {
            user: req.user
        });
    });

    app.get('/logout', (req, res) => {
        req.logout(() => {
            res.redirect('/');
        });
    });
    
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile/student',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/profile/student',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.post('/signbusiness', (req,res) => {
        
    });
};

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
}