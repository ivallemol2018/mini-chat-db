// prod.js - production 
module.exports = {
  redirectDomain : process.env.REDIRECT_DOMAIN,
  clientDbEcommerce: process.env.CLIENT_DB_ECOMMERCE,
  hostDbEcommerce: process.env.HOST_DB_ECOMMERCE,
  userDbEcommerce: process.env.USER_DB_ECOMMERCE,
  passwordDbEcommerce: process.env.PASSWORD_DB_ECOMMERCE,
  dbEcommerce : process.env.DB_ECOMMERCE
}