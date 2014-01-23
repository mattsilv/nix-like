/** 
 * Login Controller 
 */
var knex = require('knex').knex;

module.exports = {
    index: function (req, res, next) {

        if (req.user) {
            return res.redirect('/item')
        }



        knex.raw(
            'select '+
                'p.*,'+
                'a.secure_url,'+
                'pi.item_name,'+
                'pi.brand_name,'+
                'pi.id as item_id '+
            'from predict_training p '+
            'join assets a on a.upc = p.upc '+
            'join predict_items pi on pi.upc = p.upc '+
            'and a.tag_id = 1 '+
            'and p.liked = 1 '+
            'and a.deleted != 1 '+
            'and a.watermarked = 1 '+
            'order by RAND() '+
            'limit 6'
        ).exec(function (err, data){
            
            if (err) {
                return next(err);
            }

            console.log(data[0]);
            res.render('index',{
                title: 'Home',
                messages: req.flash('messages'),
                items: data[0]
            });    

        });



        
    }
};