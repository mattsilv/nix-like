/**
 * Production Configuration
 */

module.exports = {
    port: process.env.PORT || 3000,
    logger: 'dev',
    dust: {
        cache: true
    },
    session: {
        // The longer your secret the longer it takes for an
        // attacker to brute force decrypt your tamper proof
        secret: process.env.SESSION_SECRET
    },
    mysql:{
        client: 'mysql',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            charset: 'utf8',
            port: 3306
        }
    }
};