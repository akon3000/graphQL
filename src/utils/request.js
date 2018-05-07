const axios = require('axios')

class Request {
  constructor() {
    this.baseAPI = 'https://jsonplaceholder.typicode.com/'
  }

  get(url) {
    return axios.get(`${this.baseAPI}${url}`).then((res) => res)
  }

  post(url) {
    return axios.post(`${this.baseAPI}${url}`).then((res) => res)
  }
}

module.exports = new Request()