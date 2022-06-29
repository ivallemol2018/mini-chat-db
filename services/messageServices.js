const { getAll, getById, save, deleteById, update} = require('../repositories/messageRepository')
const NotFoundError = require('../exceptions/NotFoundError')

const getMessages = async () =>{
  try{
    return await getAll();
  }catch(error){
    throw error
  }
}

const getMessageById = async id =>{
  try{
    const message = await getById(id)

    if(!message){
      throw new NotFoundError('El message no existe')
    }

    return message
  }catch(error){
    throw error
  }
}

const saveMessage = async message =>{
  try{
    return await save(message)
  }catch(error){
    throw error
  }  
}

const updateMessage = async message =>{
  try{
    const messageRepository = await getById(id)

    if(!messageRepository){
      throw new NotFoundError('El message no existe')
    }

    return update(message)
  }catch(error){
    throw error
  }  
}

const deleteMessageById = async id =>{
  try{
    const message = await getById(id)

    if(!message){
      throw new NotFoundError('El message no existe')
    }

    await deleteById(id)
  }catch(error){
    throw error
  }
}

module.exports = {
  getMessages,
  getMessageById,
  saveMessage,
  deleteMessageById,
  updateMessage
}