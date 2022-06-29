const knex = require('knex')
class Storage{

  constructor(options){
    this.knex = knex(options);
  }

  setSource(table){
    this.table = table
  }

  async getAll(){
    return await this.knex(this.table).select('*')
  }

  async deleteById(id) {
    const res = await this.knex(this.table)
      .where('id','=',id)
      .del()

    return res
  }

  async deleteAll() {
    const res = await this.knex(this.table)
    return res
  }  

  async getById(id){
    return await this.knex(this.table)
            .select('*')
            .where('id','=',id)

  }

  async save(item){
    return await this.knex(this.table)
            .insert(item)
  }

  async update(item){
    return await this.knex(this.table)
              .where('id','=',item.id)
              .update(item)
  }

  destroy(){
    this.knex.destroy()
  }

}

module.exports = Storage;