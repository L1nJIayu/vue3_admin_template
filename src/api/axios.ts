import Axios from 'axios'

import { BASE_URL } from './config'

const axios = Axios.create({
  baseURL: BASE_URL + '/maintenance'
})



export default axios