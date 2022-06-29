class Message{
  constructor(email, date, message){
    this.email = email
    this.message = message
    this.date = date
  }

  get email(){
    return this._email
  }

  set email(email){
    this._email = email
  }

  get message(){
    return this._message
  }

  set message(message){
    this._message = message
  }

  get date(){
    return this._date
  }

  set date(date){
    this._date = date
  }

  toJSON(){
    const{email, message, date} = this

    return {email,message, date}
  }  
}

module.exports = Message