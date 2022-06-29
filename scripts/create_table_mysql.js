const options = require('../connection/mariadb')
const knex = require('knex')(options)

knex.schema.createTable('productos', table =>{
  table.increments('id')
  table.string('title')
  table.string('price')
  table.string('thumbnail')
}).then(()=> console.log('table created'))
  .catch(err=>{ console.log(err); throw err})
  .finally(()=>{
    knex.destroy()
  })

