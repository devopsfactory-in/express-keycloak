var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const session = require('express-session');

var memoryStore = new session.MemoryStore();                       
var keycloak = new Keycloak({ store: memoryStore });




app.use(session({                                 
secret:'thisShouldBeLongAndSecret',                         
resave: false,                         
saveUninitialized: true,                         
store: memoryStore                       
}));

app.use(keycloak.middleware());

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/public'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});



//app.use( keycloak.middleware( { logout: '/'} ));


app.listen(3000, function () {
  console.log('Express: port 3000');
});
