import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';
const { DEV_URL, PROD_URL } = process.env;

export const axiosBase = axios.create({
    baseURL: dev ? DEV_URL : PROD_URL,
    headers: {
        'Content-type': 'application/json',
    },
    timeout: 1000 * 10,
});
