/**
 * Init Passport with oAuth login strategies
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var oAuthCallback    = require('./oAuthCallback');
// expose
module.exports = function (passport, config) {
    passport.use(new FacebookStrategy({
            clientID:     config.facebook.appId,
            clientSecret: config.facebook.appSec,
            callbackURL:  config.appUrl+'/auth/facebook/callback'
        }, oAuthCallback)
    );
};