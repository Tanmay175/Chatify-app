// import axios from 'axios'

// export default axiosinstance= axios.create({
//     baseURL:import.meta.env.MODE==="development" ? "http://localhost:4000/api": "/api",
//     withCredentials:true,
// })

import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true
})