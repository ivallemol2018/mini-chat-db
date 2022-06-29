const express = require('express')
const Message = require('../models/Message')
const NotFoundError = require('../exceptions/NotFoundError')


const { getMessages, getMessageById, saveMessage, deleteMessageById, updateMessage} = require('../services/messageServices')

const { Router } = express

const router = Router()

router.get('/', async(request,response)=>{
  try{
    const messages = await getMessages()

    response.json(messages)
  } catch(error){
    return response.status(500).json({errors:[error]})
  }
})

router.post('/',async (request,response)=>{
  try{
    const {email, message} = request.body
    
    const date = new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString()

    const mess = new Message(email,date,message)

    await saveMessage(mess)

    return response.status(200).json({success: true, message:'Message registrado', id: product.id})

  } catch(error){

    return response.status(500).json({errors:[error]})
  }  
})

module.exports=router;