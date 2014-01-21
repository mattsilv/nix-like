/**
 * oAuth callback to handle redirection and user access
 */

var knex       = require('knex').knex;
var FindUserIfExists = require('./authWaterfall/FindUserIfExists');
var CreateNewUser    = require('./authWaterfall/CreateNewUser');
var UpdateUser       = require('./authWaterfall/UpdateUser');

// expose
module.exports = function(accessToken, refreshToken, profile, done) {

    var currentDate = new Date();
    var birthday    = new Date(profile._json.birthday);
    var age = ((currentDate - birthday) / 31536000000);

    var details = {
        // Basic Info
        email:      profile._json.email,
        first_name: profile._json.first_name,
        last_name:  profile._json.last_name,
        
        // extended information
        age:      parseInt(age),
        birthday: birthday,
        gender:   profile._json.gender,

        // facebook_data
        facebook_id:          profile._json.id,
        facebook_email:       profile._json.email,
        facebook_oauth_token: accessToken
    };

    // go through creation and update waterfall
    async.waterfall([
        new FindUserIfExists(knex, details),
        new UpdateUser(knex, details),
        new CreateNewUser(knex, details),
        new FindUserIfExists(knex, details)
    ], function (err, results) {

        if (err) {
            done(err);
        }

        done(null, results);

    });

};