import axios from 'axios'

export function request(config) {

  const instance = axios.create ({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeOut: 5000
  })

  // console.log(instance)
  // instance

  return instance(config)

}