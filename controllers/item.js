var knex = require('knex').knex;

module.exports = {
    index: function (req, res, next) {
        knex.raw(
            'select '+
                'a.api_id,'+
                'a.upc,'+
                'a.secure_url,'+
                'i.serving_weight,'+
                'i.serving_weight_uom,'+
                'i.calories,'+
                'i.fat,'+
                'i.carbs,'+
                'i.protein,'+
                'i.item_name,'+
                'i.brand_name '+
            'from assets a '+
            'join predict_items i on i.upc = a.upc '+
            'where a.tag_id = 1 '+
            'and a.deleted != 1 '+
            'and a.watermarked = 1 '+
            'order by rand() '+
            'limit 1'
        ).exec(function (err, data){
            if (err) {
                return next(err);
            }

            // console.log(req.flash('messages'))
            res.render('item/index', { 
                messages: req.flash('messages'),
                item: data[0],
                mode: req.session.mode
            });

        });
    },
    rateProduct: function (req, res, next) {
        var regExp = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;
        req.assert('upc',   'must be an intenger').notNull().isInt();
        req.assert('liked', 'must be truthy').notNull().isInt().isIn(['1','0']);
        // req.assert('mode',  'either 1:Indulgent or 0:Healthy').notNull().isIn(['1','0']);

        if (req.param('geoloc')) {
            // req.assert('geoloc','must match latitude,longitude') // .is(regExp);
        }

        // console.log(req.param('mode'))
        var validationErrors = req.validationErrors(true);

        if (validationErrors) {
            Object.keys(validationErrors).forEach(function(key){
                var error = validationErrors[key];
                req.flash('messages',{
                    type:  'warning',
                    title: error.param,
                    text:  error.msg
                });
            });
            return res.redirect('/item');
        }

        var mode = ['Healthy','Indulgent'][Number(req.param('mode'))];

        req.session.mode = mode;
        req.session.save();

        knex('predict_items')
            .select('*')
            .where({ upc: req.param('upc') })
            .exec(function (err, data){

                if (err) {
                    req.flash('messages', {
                        type: 'danger',
                        title:'Oh No!',
                        text: 'something went wrong while rating a product'
                    });

                    return next(err);
                }

                if (!data.length) {
                    
                    req.flash('messages', {
                        type:  'warning',
                        title: 'Hmmm',
                        text:  'I couldn\'t find an product with that UPC.. lets try a different one.'
                    });

                    res.redirect('/item');
                }

                var i = data[0];
                var ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                var protein_ratio = (i.protein / i.serving_weight);
                var carb_ratio = (i.carbs / i.serving_weight);
                var fat_ratio = (i.fat / i.serving_weight);
                knex('predict_training')
                    .insert({
                        upc:    req.param('upc'),
                        liked:  req.param('liked'),
                        // mode:   mode,
                        age:    req.user.age,
                        gender: req.user.gender,
                        app_id: 'NIX_PREDICTION',
                        app_user_id: req.user.id,
                        // geoloc: req.param('geoloc'),
                        ip_address:   ip_address,
                        protein_ratio: isNaN(protein_ratio) ? null : protein_ratio,
                        carb_ratio: isNaN(carb_ratio) ? null : carb_ratio,
                        fat_ratio: isNaN(fat_ratio) ? null : fat_ratio,
                        createdAt: new Date()
                    }).exec(function(err){

                        if (err) {
                            return next(err);
                        }

                        res.redirect('/item');

                    });



            });
    }
};