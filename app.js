
/**
 * Module dependencies.
 */


global._     = require('underscore');
global.async = require('async');


var path    = require('path');
var http    = require('http');
var express = require('express');

var app = express();


// View and Rendering Engines
var ejs   = require('ejs');
var jade  = require('jade');
var adaro = require('adaro');


// Enviromental Config
var NODE_ENV = process.env.NODE_ENV || 'development';
var config   = require('./config/'+NODE_ENV);


// Configure Database
var Knex  = require('knex');
Knex.knex = Knex.initialize(config.mysql);

// Configure Login thru Passport
var passport = require('passport');
require('./lib/auth/local')(passport);
require('./lib/auth/oAuth')(passport, config);
require('./lib/auth/userSerialization')(passport);


// Set app pref
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));

// install rendering engines
app.engine('ejs',  require('ejs').__express);
app.engine('jade', require('jade').__express);
app.engine('dust', require('adaro').dust({cache:config.dust.cache}));
app.set('view engine', 'dust');

// Hookup logging / parsing middleware
app.use(express.logger(config.logger));
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(require('express-validator')());

// Method Override Header
app.use(express.methodOverride());

// configure session support
app.use(express.cookieParser(config.session.secret));
app.use(express.session({ secret: config.session.secret }));
app.use(require('connect-flash')());
app.use(passport.initialize());
app.use(passport.session());

// Start the router
app.use(app.router);

// serve static files from public folders
app.use(express.static(path.join(__dirname, 'public')));

// development only
// default error handler
// replace with production ready version
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// Handle Application Routing
app.get('/', require('./controllers').index);



var itemCtrl        = require('./controllers/item');
var sessionsCtrl    = require('./controllers/sessions');
var usersCtrl       = require('./controllers/users');
var isAuthenticated = require('./policies/isAuthenticated');

app.get('/item', isAuthenticated, itemCtrl.index);
app.post('/item', isAuthenticated, itemCtrl.rateProduct);


app.get('/users/:id', isAuthenticated, usersCtrl.index);

// Sessions
app.all('/auth/logout', sessionsCtrl.logout);
app.get('/auth/local',  sessionsCtrl.localLogin);

app.post('/auth/local',
    passport.authenticate('local', {
        successRedirect: '/item',
        failureRedirect: '/',
        failureFlash: true
    })
);

app.get('/auth/facebook',
    passport.authenticate('facebook',{
        scope: ['user_birthday', 'user_location','email']
    })
);

// publish_stream
// publish_actions
// user_likes
// user_interests

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/item',
        failureRedirect: '/'
    })
);


// Start Server
var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

server.on('error', function(e){
    console.error('HTTP error event fired', e);
});



// slap myself to stay awake :)
// otherwise heroku will put me to sleep
if (NODE_ENV === 'production') {
    var request = require('request');
    setInterval(function(){
        console.log('Slapping myself to stay awake');
        console.log('I\'ve been awake for', process.uptime(), 'seconds');
        console.log(process.memoryUsage());
        request.get('http://nix-prediction.herokuapp.com', function(err){
            
            if (err) {
                console.error('I think i fell asleep');
            }

            console.log('*** SLAP *** OUCH!!!');
        });
    }, 60000);
}