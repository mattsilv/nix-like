module.exports = function (req, res, next) {
    
    if(req.user) {

        res.locals({
            session: req.session,
            user: req.user
        });

        return next();
    } else {
        
        var message = {
            type:  'warning',
            title: 'Whoa There!',
            text:  'You must be logged '+
                   'in to view this page.'
        };

        req.flash('messages', message);
        res.redirect('/');
    }
};