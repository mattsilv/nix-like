/**
 * Development Configuration
 */

module.exports = {
    port: 3000,
    logger: 'dev',
    dust: {
        cache: false
    },
    session: {
        secret: 'ZSAgPSByZXF1aXJlKCdqYWRlJyk7CnZhciBhZGFyby'
    },
    mysql:    require('./local/testingdb'),
    facebook: require('./local/facebook'),
    appUrl:   'http://localhost:3000'
};