const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;

const { clientID, clientSecret, callbackURL } = require('./credentials');
const mainView = require('./views/main');
const notFound = require('./views/404');

// Set up an instance of express
const app = express();

/*------------------------------------------------------------------------------
  SETUP OF WEBSOCKET USING SOCKET.IO
------------------------------------------------------------------------------*/

const server = require('http').Server(app);
const io = require('socket.io')(server);

// This is not used at the moment.
io.on('connection', (socket) => {
  console.log('A user is connected');
});

// This is just for testing purposes.
let count = 0;
setInterval(() => io.emit('count', (count += 1)), 30000);

/*------------------------------------------------------------------------------
  SESSION SUPPORT
------------------------------------------------------------------------------*/

app.use(session({
  secret: 'cool dino friend',
  resave: false,
  saveUninitialized: false
}));

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

// Initialize Passport (required since we are using Express)
app.use(passport.initialize());

// Needed for persistent login sessions
app.use(passport.session());

/*------------------------------------------------------------------------------
  REDIRECTS HANDLED BY EXPRESS
------------------------------------------------------------------------------*/

// When visiting '/login', user is redirected to Facebook
app.get('/login', passport.authenticate('facebook', { scope: 'user_friends' }));

// If authentication is successful, user is redirected home.
app.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // res.send(req.user);
    res.redirect('/');
  }
);

// Use folder 'build' for static files.
app.use(express.static('build'));

// Redirect to main page
app.get('/', (req, res) => {
  res.send(mainView(req));
});

// If no other page is specified or found, 404 is shown.
app.get('*', (req, res) => {
  res.send(notFound());
});

// Listen on http://localhost:3000/
server.listen(3000);
