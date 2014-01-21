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
    mysql:{
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: void 0,
            database: 'nutritionix-api',
            charset: 'utf8',
            port: 3306
        }
    }
};