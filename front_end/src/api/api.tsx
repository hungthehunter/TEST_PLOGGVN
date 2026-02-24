import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:58203/hubspot',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;