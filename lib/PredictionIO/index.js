var _       = require('require');
var __url   = require('url');
var request = require('request');

module.exports = function(config) {
    
    if (typeof config.apiKey !== 'string') {
        throw new Error('apiKey is not a string');
    }

    config._url = __url.parse(config.url);

    var apiLib = {

        users: {
            build: function(ovr){
                return {

                }
            },
            create: function (data, cb) {
                apiLib.raw({
                    method: 'POST',
                    url: apiLib.config.url + '/users.json',
                    qs: apiLib.config.apiKey,
                    json: data
                }, cb);
            },
            get: function (id, cb) {
                apiLib.raw({
                    method:'GET',
                    url: apiLib.config.url + '/users/' + id + '.json',
                    qs: apiLib.config.apiKey
                }, cb);
            },
            delete: function (id, cb) {
                apiLib.raw({
                    method:'DELETE',
                    url: apiLib.config.url + '/users/' + id + '.json',
                    qs: apiLib.config.apiKey
                }, cb);
            }
        },

        items:{
            build: function(ovr){
                ovr
                return _.extend(ovr, {
                    pio_iid: void 0,
                    pio_itypes: void 0,
                    pio_latlng: void 0,
                    pio_inactive: void 0,
                    pio_startT: void 0,
                    pio_endT: void 0,
                });
            },
            create: function (data, cb) {
                apiLib.raw({
                    method: 'POST',
                    url: apiLib.config.url + '/items.json',
                    qs: apiLib.config.apiKey,
                    json: data
                }, cb);
            },
            get: function (id, cb) {
                apiLib.raw({
                    method:'GET',
                    url: apiLib.config.url + '/items/' + id + '.json',
                    qs: apiLib.config.apiKey
                }, cb);
            },
            delete: function (id, cb) {
                apiLib.raw({
                    method:'DELETE',
                    url: apiLib.config.url + '/items/' + id + '.json',
                    qs: apiLib.config.apiKey
                }, cb);
            }
        }
        
        

        // basic raw request
        raw: function(data, cb) {
            
            request(data, function(err, res, body){
                
                if (err || res && res.statusCode >= 400) {
                    var error = err ? err : new Error({ status: res.statusCode body:body});
                    return cb(error, null);
                }

                return cb(null, body);
            });
        },

        config: config

    };

    return apiLib;
}