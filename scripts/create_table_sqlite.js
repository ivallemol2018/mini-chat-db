const connection = require('../connection/sqlite')
const knex = require('knex')(connection)

knex.schema.createTable('mensajes', table =>{
  table.increments('id')
  table.string('email')
  table.datetime('date')
  table.string('message')
}).then(()=> console.log('table created'))
  .catch(err=>{ console.log(err); throw err})
  .finally(()=>{
    knex.destroy()
  })