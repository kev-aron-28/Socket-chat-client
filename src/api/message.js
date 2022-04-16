import axios from "axios"

const messageApi = axios.create({  
  baseURL: 'http://localhost:3000/api/messages'
})

export default messageApi
