/**
 * Init Passport serialization
 */

var knex = require('knex').knex;

// expose
module.exports = function (passport) {

    // store user.id in session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // retrieve the user from id store in request session
    passport.deserializeUser(function(id, done) {
        knex('users')
            .select('*')
            .where({ id: id })
            .exec(function(err, data) {
                done(err, data[0]);
            });
    });
};