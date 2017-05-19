const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const mainView = require('./views/main');
const scoreView = require('./views/score');
const loginView = require('./views/login');

// Secret variables stored on Heroku
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const callbackURL = process.env.callbackURL;

// The functions for handling user database
const {
  addUser,
  getUserById,
  getFriendsScore,
  updateUserHighScore
} = require('./database/handle-users');

// Set up an instance of express
const app = express();

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

/*------------------------------------------------------------------------------
  SETUP OF WEBSOCKET USING SOCKET.IO
------------------------------------------------------------------------------*/

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // When recieving information about new high score, update database
  socket.on('on-highscore', function (data) {
    updateUserHighScore(data).then(() => {
      // Send message about new highscore to everyone BUT sender
      socket.broadcast.emit('new-highscore', data);
    });
  });
});

/*------------------------------------------------------------------------------
  SESSION SUPPORT
------------------------------------------------------------------------------*/

app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

/*------------------------------------------------------------------------------
  USE PASSPORT TO HANDLE AUTHENTICATION
------------------------------------------------------------------------------*/

/**
 * In order to restore authentication state across HTTP requests,
 * Passport needs to serialize users into and deserialize users out of the session.
 */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => getUserById(id).then(user => done(null, user), done));

/**
 * Configure a new Facebook strategy.
 */
passport.use(new FacebookStrategy({
  clientID,
  clientSecret,
  callbackURL,
  profileFields: ['id', 'displayName', 'picture.type(large)', 'friends']
}, function (accessToken, refreshToken, profile, done) {
  // Check if user already exists in database
  getUserById(profile.id)
    .then((result) => {
      if (!result) {
        addUser(profile)
          .then(user => done(null, user))
          .catch(error => done(error));
      } else {
        done(null, result);
      }
    })
    .catch(error => done(error));
}));

// Initialize Passport (required since we are using Express)
app.use(passport.initialize());

// Needed for persistent login sessions
app.use(passport.session());

/*------------------------------------------------------------------------------
  REDIRECTS HANDLED BY EXPRESS
------------------------------------------------------------------------------*/

// Let Facebook handle login procedure
app.get('/login', passport.authenticate('facebook', { scope: 'user_friends' }));

// On successful authentication, send user to game
app.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/play');
  }
);

// On logout, remove the req.user property and clear the login session.
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Use folder 'build' for static files
app.use(express.static('build'));

// Get information about user when logging in
app.get('/getuser', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.redirect('/');
  }
});

// Get information about highscore
app.get('/getscore', (req, res) => {
  if (req.isAuthenticated()) {
    getFriendsScore(req.user)
    .then((highscore) => {
      res.json(highscore);
    });
  } else {
    res.redirect('/');
  }
});

// Direct user to highscore page if logged in
app.get('/highscore', (req, res) => {
  if (req.isAuthenticated()) {
    getFriendsScore(req.user)
    .then((highscore) => {
      const state = {
        user: req.user,
        highscore
      };

      return res.send(scoreView(state));
    }, (err) => {
      res.status(500);
      res.send(err);
    });
  } else {
    res.send(loginView());
  }
});

// Direct user to main page if logged in
app.get('*', (req, res) => {
  if (req.isAuthenticated()) {
    const state = {
      user: req.user
    };
    res.send(mainView(state));
  } else {
    res.send(loginView());
  }
});

server.listen(port);
