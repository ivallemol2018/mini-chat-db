class Product{
  constructor(title,thumbnail){
    this.title = title
    this.thumbnail = thumbnail
    this.price = 0.0
  }

  set id(id){
    this._id = id;
  }

  get id(){
    return this._id;
  }

  set title(title){
    if(!title?.trim())
      throw 'The title should have a value'
    this._title = title;
  }

  get title(){
    return this._title;
  }

  set thumbnail(thumbnail){
    if(!thumbnail?.trim())
      throw 'The photo should have a value'
    this._thumbnail = thumbnail  
  }

  get thumbnail(){
    return this._thumbnail
  }

  toJSON(){
    const {id, title, price, thumbnail} = this

    return {id, title, price, thumbnail}
  }  

}

module.exports = Product