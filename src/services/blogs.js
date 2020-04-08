import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postAll = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const res = axios.post(baseUrl, newObject,config)
  return res.data
}

export default { getAll,postAll,setToken }