import db from '../db'  
import ProductsRepository from '../repo/product.repository'
import ProductsController from '../controllers/product.controller'

const productsRepository = new ProductsRepository(db)
const   productsController = new ProductsController(productsRepository)

export { productsController }