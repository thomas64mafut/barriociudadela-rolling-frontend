import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

clientAxios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        sessionStorage.clear();
    }
    return Promise.reject(error);
})

clientAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwt');
    config.headers.Authorization = token ?? '';
    return config;
})

export default clientAxios;