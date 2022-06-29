const keys = require('../config/keys');

const options = {
  client: keys.clientDbEcommerce,
  connection: {
    host: keys.hostDbEcommerce,
    user: keys.userDbEcommerce,
    password: keys.passwordDbEcommerce,
    database: keys.dbEcommerce
  }  
}

module.exports = options