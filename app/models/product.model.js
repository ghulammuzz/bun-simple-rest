export default class Product {
    constructor(id, title, active) {
      this.id = id
      this.title = title
      this.active = active === 1 ? true : false
    }
  }