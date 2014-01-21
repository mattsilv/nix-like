/** 
 * Login Controller 
 */

module.exports = {
    index: function (req, res, next) {

        if (req.user) {
            return res.redirect('/item')
        }

        res.render('login/index',{
            title: 'login',
            messages: req.flash('messages')
        });
    }
};