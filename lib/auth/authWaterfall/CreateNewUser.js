module.exports = function (knex, newUser) {
    return function (user, finish) {
        
        if (user) {
            return finish(null);
        }

        knex('users')
            .insert(newUser)
            .exec(function (err){
                finish(err);
            });
    }
}