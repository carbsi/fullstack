import axios from "axios";
// const api_key = import.meta.env.VITE_API_KEY;
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
// const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
const getAllCountries = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default getAllCountries;
