import Product from '../models/product.model'

export default class ProductRepository {
  #db

  constructor(db) {
    this.#db = db
  }

  getAll = () => {
    const query = this.#db.prepare('SELECT * FROM product')
    const response = query.all()

    query.finalize()

    const products = response.map(item => new Product(item.id, item.title, item.active))
    return products
  }

  getById = id => {
    const query = this.#db.prepare('SELECT * FROM product WHERE id = ?')
    const [item] = query.all(id)

    query.finalize()

    if (!item) {
      return null
    }

    const product = new Product(item.id, item.title, item.active)
    return product
  }

  create = title => {
    const query = this.#db.prepare(
      'INSERT INTO product (title) VALUES (?) RETURNING *',
    )
    const [item] = query.all(title)

    query.finalize()

    const product = new Product(item.id, item.title, item.active)
    return product
  }

  update = (id, active) => {
    let isActive

    if (active) {
      isActive = 1
    } else {
      isActive = 0
    }

    const query = this.#db.prepare(
      'UPDATE product SET active = $active WHERE id = $id',
    )
    query.run({
      $active: isActive,
      $id: id,
    })
    query.finalize()
  }

  delete = id => {
    const query = this.#db.prepare('DELETE FROM product WHERE id = ?')
    query.run(id)
    query.finalize()
  }
}