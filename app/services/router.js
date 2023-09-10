export default class Router {
    response
    #request
    #url
  
    constructor(request) {
      this.response = Response.json({ 404: 'Not Found.' }, { status: 404 })
      this.#request = request
      this.#url = new URL(request.url)
    }
  
    get(path, callback) {
      this.#genericRequest('GET', path, callback)
    }
  
    post(path, callback) {
      this.#genericRequest('POST', path, callback)
    }
  
    put(path, callback) {
      this.#genericRequest('PUT', path, callback)
    }
  
    patch(path, callback) {
      this.#genericRequest('PATCH', path, callback)
    }
  
    delete(path, callback) {
      this.#genericRequest('DELETE', path, callback)
    }
  
    #genericRequest(method, path, callback) {
      const isValidPath = this.#validatePath(path, this.#url.pathname)
  
      if (isValidPath && this.#request.method === method) {
        this.#getPathParams(path, this.#url.pathname)
        this.response = callback(this.#request)
      }
    }
  
    #validatePath(pathModel, pathname) {
      const pathsFromPathModel = pathModel.split('/')
      const pathsFromPathname = pathname.split('/')
  
      if (pathsFromPathModel[0] === '') {
        pathsFromPathModel.shift()
      }
  
      if (pathsFromPathModel[pathsFromPathModel.length - 1] === '') {
        pathsFromPathModel.pop()
      }
  
      if (pathsFromPathname[0] === '') {
        pathsFromPathname.shift()
      }
  
      if (pathsFromPathname[pathsFromPathname.length - 1] === '') {
        pathsFromPathname.pop()
      }
  
      if (pathsFromPathModel.length !== pathsFromPathname.length) {
        return false
      }
  
      const isValid = pathsFromPathModel.every((path, index) => {
        if (path.startsWith(':') && pathsFromPathname[index] !== undefined) {
          return true
        }
  
        return path === pathsFromPathname[index]
      })
  
      return isValid
    }
  
    #getPathParams(pathModel, pathname) {
      const pathsFromPathModel = pathModel.split('/')
      const pathsFromPathname = pathname.split('/')
  
      if (pathsFromPathModel[0] === '') {
        pathsFromPathModel.shift()
      }
  
      if (pathsFromPathModel[pathsFromPathModel.length - 1] === '') {
        pathsFromPathModel.pop()
      }
  
      if (pathsFromPathname[0] === '') {
        pathsFromPathname.shift()
      }
  
      if (pathsFromPathname[pathsFromPathname.length - 1] === '') {
        pathsFromPathname.pop()
      }
  
      const params = pathsFromPathModel.reduce((pathParams, path, index) => {
        if (path.startsWith(':')) {
          pathParams[path.slice(1)] = pathsFromPathname[index]
        }
  
        return pathParams
      }, {})
  
      this.#request.params = params
    }
  }