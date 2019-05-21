var express = require('express');
var router = express.Router();
const session = require('express-session');

const Keycloak = require('keycloak-connect');
var memoryStore = new session.MemoryStore();                       

var keycloak = new Keycloak({ store: memoryStore });


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/public/index.html'));
});




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