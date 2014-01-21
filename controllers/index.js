/** 
 * Login Controller 
 */

module.exports = {
    index: function (req, res, next) {

        if (req.user) {
            return res.redirect('/item')
        }

        res.render('index',{
            title: 'Home',
            messages: req.flash('messages')
        });
    }
};