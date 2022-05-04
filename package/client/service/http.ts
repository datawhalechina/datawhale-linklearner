import axios from 'axios';

const DEV_BACKEND_URL = 'http://localhost:8081';
const PROD_BACKEND_URL = 'https://linklearner.com';

export const DATAWHALE_HOMEPAGE_URL = 'https://datawhale.club';

const DEV_BASE_URL = 'http://localhost:8080/';
const PROD_BASE_URL = '';

export const AXIOS_BASE_URL = process.env.NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL;
axios.defaults.baseURL = AXIOS_BASE_URL;

export const http = axios;
