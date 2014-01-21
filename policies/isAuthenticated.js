module.exports = function (req, res, next) {
    if(req.user) {
        // var message = {
        //     type:'success',
        //     title: 'Welcome,',
        //     text:  'you signed in successfully!'

        // };

        // req.flash('messages', message);
        
        res.locals({
            session: req.session,
            user: req.user
        });

        return next();
    } else {
        
        var message = {
            type:  'warning',
            title: 'Woe There!',
            text:  'You must be logged '+
                   'in to view this page.'
        };

        req.flash('messages', message);
        res.redirect('/');
    }
};