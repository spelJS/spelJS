const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const { clientID, clientSecret, callbackURL } = require('./credentials.js');

// Set up an instance of express
const app = express();

// Initialize Passport (required since we are using Express)
app.use(passport.initialize());

/*------------------------------------------------------------------------------
  SESSION SUPPORT
------------------------------------------------------------------------------*/

// FIXME: Are we going to use this? If not, remove completely.
app.use(session({
  secret: 'cool dino friend',
  resave: false,
  saveUninitialized: false
}));

// Needed for persistent login sessions
app.use(passport.session());

/*------------------------------------------------------------------------------
  USE PASSPORT TO HANDLE AUTHENTICATION
------------------------------------------------------------------------------*/

// In order to restore authentication state across HTTP requests,
// Passport needs to serialize users into and deserialize users out of the session.
// Explaination: https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Configure a new strategy. clientID, clientSecret and callbackURL
// are all found in credentials.js.
passport.use(new FacebookStrategy({
  clientID,
  clientSecret,
  callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

/*------------------------------------------------------------------------------
  REDIRECTS HANDLED BY EXPRESS
------------------------------------------------------------------------------*/

// When visiting '/login', user is redirected to Facebook
app.get('/login', passport.authenticate('facebook', { scope: 'user_friends' }));

// If authentication is successful, user is redirected home.
app.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

// If no other page is specified, this is what's going to be shown.
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>spelJS</title>
    </head>
    <body>
      <h1>Hello!</h1>
      <a href="/login">Logga in</a>
    </body>
    </html>
  `);
});

// Listen on http://localhost:3000/
app.listen(3000);
