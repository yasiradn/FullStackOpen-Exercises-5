import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const postAll = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const res = axios.post(baseUrl, newObject,config)
  return res.data
}

const updateAll = async newObject => {
  const res = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return res.data
}

const deleteBlog = async obj => {
  const config = {
    headers: { Authorization: token },
  }
  axios.delete(`${baseUrl}/${obj}`, config)
}

export default { getAll,postAll,setToken, updateAll, deleteBlog }