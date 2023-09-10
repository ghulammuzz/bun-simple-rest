export default class ProductController {
    #productsRepository
  
    constructor(productsRepository) {
      this.#productsRepository = productsRepository
    }
  
    list = () => {
      const products = this.#productsRepository.getAll()
      return Response.json(products)
    }
  
    get = req => {
      const { id } = req.params
      const product = this.#productsRepository.getById(id)
  
      if (!product) {
        return Response.json({ error: 'product not found.' }, { status: 404 })
      }
  
      return Response.json(product)
    }
  
    create = async req => {
      const body = await req.json()
      const { title } = body
  
      if (!title) {
        return Response.json({ error: 'title not found.' }, { status: 400 })
      }
  
      const product = this.#productsRepository.create(title)
      return Response.json(product, { status: 201 })
    }
  
    update = async req => {
      const body = await req.json()
      const { active } = body
  
      if (typeof active !== 'boolean') {
        return Response.json(
          { error: `Invalid value for 'active': ${active}` },
          { status: 400 },
        )
      }
  
      const { id } = req.params
      this.#productsRepository.update(id, active)
      return Response.json({ ok: true })
    }
  
    delete = req => {
      const { id } = req.params
      this.#productsRepository.delete(id)
      return Response.json({ ok: true })
    }
  }