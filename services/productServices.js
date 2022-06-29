const { getAll, getById, save, deleteById, update} = require('../repositories/productRepository')
const NotFoundError = require('../exceptions/NotFoundError')

const getProducts = async () =>{
  try{
    return await getAll();
  }catch(error){
    throw error
  }
}

const getProductById = async id =>{
  try{
    const product = await getById(id)

    if(!product){
      throw new NotFoundError('El producto no existe')
    }

    return product
  }catch(error){
    throw error
  }
}

const saveProduct = async product =>{
  try{
    return await save(product)
  }catch(error){
    throw error
  }  
}

const updateProduct = async product =>{
  try{
    const productRepository = await getById(id)

    if(!productRepository){
      throw new NotFoundError('El producto no existe')
    }

    return update(product)

  }catch(error){
    throw error
  }  
}

const deleteProductById = async id =>{
  try{
    const product = await getById(id)

    if(!product){
      throw new NotFoundError('El producto no existe')
    }

    await deleteById(id)
  }catch(error){
    throw error
  }
}

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
  deleteProductById,
  updateProduct
}