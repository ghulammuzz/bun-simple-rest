import { serve } from 'bun'

import ProductsRoutes from './routes/product.routes'

serve({
  port: 8080,
  fetch(request) {
    const productsRoutes = new ProductsRoutes(request)
    return productsRoutes.getResponse()
  },
})