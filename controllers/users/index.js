knex = require('knex').knex;

module.exports = {
    index: function (req, res, next) {
        
        knex('users')
            .select(knex.raw(
                'users.*,'+
                'COUNT(predict_training.id) as review_count,'+
                '@protein_ratio_avg := (AVG(predict_training.protein_ratio)*100) as protein_ratio_avg,'+
                '@carb_ratio_avg := (AVG(predict_training.carb_ratio)*100) as carb_ratio_avg,'+
                '@fat_ratio_avg := (AVG(predict_training.fat_ratio)*100) as fat_ratio_avg,'+
                '(100-(@protein_ratio_avg+@carb_ratio_avg+@fat_ratio_avg)) as other_pct'
            ))
            .join('predict_training', function(){
                this.on('users.id','=','predict_training.app_user_id')
            })
            .where({ 'users.id': req.param('id') })
            .exec(function(err, data) {
                if (err) {
                    return next(err);
                }
                console.log(data[0])
                res.render('users/index',{
                    user_profile: data[0]
                });
            });
        
    },
    profileReviewList: function (req, res, next) {
        // knex('')
    },
    settings: function (req, res, next) {
        
    }
}