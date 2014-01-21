/**
 * Init Passport with local login strategy
 */

var knex   = require('knex').knex;
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
// expose
module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {

            username = String(username)
                            .toLowerCase();

            knex('users')
                .select('*')
                .where({ username: username })
                .orWhere({ email: username })
                .exec(function(err, data) {
                    var user = data[0];
                    
                    if (err) {
                        return done(err);
                    }

                    if (user === void 0) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        });
                    }

                    // Compare users hash to password
                    // using bcrypt military grade encryption
                    bcrypt.compare(password, user.hash,
                        function(err, correctPassword) {
                        
                            if (correctPassword === false) {
                                return done(null, false, {
                                    type: 'warning',
                                    title: 'Oops!',
                                    text: 'Incorrect username or password'
                                });
                            }

                            // correct password provided
                            return done(null, user);
                        }
                    );
                
            });
        }
    ));
};