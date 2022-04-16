import axios from "axios"

const userApi = axios.create({  
  baseURL: 'http://localhost:3000/api/users'
})

export default userApi
