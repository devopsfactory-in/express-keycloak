var express = require('express');
var router = express.Router();
var User = require('../models/user');
const session = require('express-session');

const Keycloak = require('keycloak-connect');
var memoryStore = new session.MemoryStore();                       

var keycloak = new Keycloak({ store: memoryStore });


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/public/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile',keycloak.protect(), function (req, res, next) {
    return res.send('Successfully authenticated as normal user <br><a type="button" href="/logout">Logout</a>')
});

// GET route after registering
router.get('/admin',keycloak.protect('admin'), function (req, res, next) {
    return res.send('Successfully authenticated as admin user <br><a type="button" href="/logout">Logout</a>')
});

// GET route after registering
router.get('/realmadmin',keycloak.protect('realm:admin'), function (req, res, next) {
    return res.send('Successfully authenticated as realm admin user <br><a type="button" href="/logout">Logout</a>')
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});






module.exports = router;