module.exports = function (knex, details) {
    return function (user, finish) {
        
        if (!user) {
            return finish(null, user);
        }

        knex('users')
            .where({ facebook_email: details.facebook_email })
            .orWhere({ facebook_id:  details.facebook_id })
            .update({
                age:                  details.age,
                birthday:             details.birthday,
                gender:               details.gender,
                facebook_id:          details.facebook_id,
                facebook_email:       details.facebook_email,
                facebook_oauth_token: details.facebook_oauth_token,
            })
            .exec(function (err){
                finish(err, user);
            });
    }
}