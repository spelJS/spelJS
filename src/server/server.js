const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;

const { clientID, clientSecret, callbackURL } = require('./credentials');
const mainView = require('./views/main');
const notFound = require('./views/404');

// The functions for handling user database.
const {
  getUserById,
  addUser,
  updateUserHighScore
} = require('./database/handle-users');

// Set up an instance of express
const app = express();

/*------------------------------------------------------------------------------
  SETUP OF WEBSOCKET USING SOCKET.IO
------------------------------------------------------------------------------*/

const server = require('http').Server(app);
const io = require('socket.io')(server);

// io.on('connection', function (socket) {
//   socket.on('on-highscore', (data) => {
//     updateUser(data.id, { highscore: data.highscore }).then(() => {
//       socket.broadcast.emit('new-highscore', data); // Send message to everyone BUT sender
//     });
//   });
// });

io.on('connection', (socket) => {
  // On information about new high score, update database
  socket.on('on-highscore', function (data) {
    updateUserHighScore(data).then(() => {
      // FIXME: This is not working at the moment.
      socket.broadcast.emit('new-highscore', data); // This is sent to everyone but sender
    });
  });
});

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

/**
 * In order to restore authentication state across HTTP requests,
 * Passport needs to serialize users into and deserialize users out of the session.
 * Explaination: https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
 */
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

/**
 * Configure a new Facebook strategy. clientID, clientSecret and callbackURL
 * are all found in credentials.js.
 */
passport.use(new FacebookStrategy({
  clientID,
  clientSecret,
  callbackURL,
  profileFields: ['id', 'displayName', 'photos']
}, function (accessToken, refreshToken, profile, done) {
  // Check if user already exists in database
  getUserById(profile.id)
    .then((result) => {
      if (!result) {
        addUser(profile)
          .then(user => done(null, user))
          .catch(error => done(error));
      } else {
        // TODO: Update user information
        // (check if profile pic needs to be updated)
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

// When visiting '/login', user is redirected to Facebook
app.get('/login', passport.authenticate('facebook', { scope: 'user_friends' }));

// If authentication is successful, user is redirected home.
app.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// On logout, remove the req.user property and clear the login session.
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Use folder 'build' for static files.
app.use(express.static('build'));

// Redirect to main page
app.get('/', (req, res) => {
  res.send(mainView(req));
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Not logged in, fool!');
  }
});

// If no other page is specified or found, 404 is shown.
app.get('*', (req, res) => {
  res.send(notFound());
});

// Listen on http://localhost:3000/
server.listen(3000);
