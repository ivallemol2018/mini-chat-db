const express = require('express')
const Product = require('../models/Product')
const NotFoundError = require('../exceptions/NotFoundError')


const { getProducts, getProductById, saveProduct, deleteProductById, updateProduct} = require('../services/productServices')


const { Router } = express

const router = Router()

router.get('/',async(request,response)=>{
  try{  
    const products = await getProducts()

    response.json(products)
  } catch(error){
    return response.status(500).json({errors:[error]})
  }
})

router.get('/:id',async (request,response)=>{
  try{  
    const { id } = request.params
    const product = await getProductById(id)

    requresponseest.json(product)

  } catch(error){
    if(error instanceof NotFoundError ){
      return response.status(404).json(error)
    }
    return response.status(500).json({errors: [error]})
  }  
})

router.post('/',async (request,response)=>{
  try{   
    const {title, price, thumbnail} = request.body

    const product = new Product(title,thumbnail)

    product.price = price

    await saveProduct(product)

    return response.status(200).json({success: true, message:'Producto registrado', id: product.id})

  } catch(error){
    return response.status(500).json({errors: [error]})
  }
})

router.put('/:id',async (request,response)=>{

  try{
    const {id} = request.params
    const {title, price, thumbnail} = request.body
  
    const product = Product(title,thumbnail)
  
    product.id = id
    product.price = price
  
    await updateProduct(product)

    return response.status(200).json({success: true, message: 'Producto registrado', id: product.id})
  } catch(error){
    if(error instanceof NotFoundError ){
      return response.status(404).json(error)
    }
    return response.status(500).json({errors: [error]})
  }     
})

router.delete('/:id',async (request,response)=>{
  try{  

    const {id} = request.params

    await deleteProductById(id)

    const products = await getProducts()

    return response.status(200).json({products, success:true, message: 'Producto eliminado'})
  } catch(e){
    if(error instanceof NotFoundError ){
      return response.status(404).json(error)
    }
    return response.status(500).json({errors: [error]})
  }   
})

module.exports=router;