$(document).ready(function() {

    if ('geolocation' in navigator && window.location.pathname === '/item') {
        
        // var form = $('input, button, select');
        
        // Disable form until user
        // allows access to their location
        // form.attr('disabled', 'disabled')
        // Ask for location
        // navigator.geolocation.getCurrentPosition(function(position) {

        //     var geoloc = [position.coords.latitude, position.coords.longitude].join(',');

        //     $('#geoloc').val(geoloc);

        //     // unlock form
        //     // form.removeAttr('disabled');
        // });

    }

    $('.progress-bar').tooltip()

});