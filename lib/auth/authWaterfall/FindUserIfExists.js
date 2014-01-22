module.exports = function(knex, details) {
    return function (finish) {
        knex('users')
            .select('*')
            .where({ facebook_email: details.facebook_email })
            .orWhere({ facebook_id:  details.facebook_id })
            .exec(function(err, data){
                finish(err, data ? data[0] : null);
            });
    }
};