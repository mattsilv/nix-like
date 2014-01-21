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
            .select(knex.raw(
                'users.*,'+
                'COUNT(predict_training.id) review_count'
            ))
            .join('predict_training', function(){
                this.on('users.id','=','predict_training.app_user_id')
            })
            .where({ 'users.id': id })
            .exec(function(err, data) {
                done(err, data[0]);
            });
    });
};