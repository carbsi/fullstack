import axios from 'axios'


// palauttaa token+username+name onnistuneen kirjautumisen jalkeen
const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export default { login }
