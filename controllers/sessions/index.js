/**
 * 
 */

// Expose
module.exports = {
    index: function (req, res, next) {

    },
    localLogin: function (req, res, next) {

        if (req.user) {
            return res.redirect('/item')
        }

        res.render('login/index',{
            title: 'login',
            messages: req.flash('messages')
        });
        
    },
    logout: function (req, res) {
    
        req.flash('messages',{
            type: 'success',
            title: 'See you later',
            text: 'Thanks for training us!'
        });

        req.logout();
        res.redirect('/');
    }
};