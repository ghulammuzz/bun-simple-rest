import { productsController } from '../modules/product.module.js'
import Router from '../services/router'

export default class ProductsRoutes {
  #router

  constructor(request) {
    this.#router = new Router(request)
    this.#routes()
  }

  #routes = () => {
    this.#router.get('products', productsController.list)
    this.#router.get('products/:id', productsController.get)
    this.#router.post('products', productsController.create)
    this.#router.put('products/:id', productsController.update)
    this.#router.delete('products/:id', productsController.delete)
  }

  getResponse = () => {
    return this.#router.response
  }
}