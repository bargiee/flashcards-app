import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await refreshClient.post('/auth/refresh');
                    isRefreshing = false;
                    return api(originalRequest);
                } catch (err) {
                    isRefreshing = false;
                    toast.error('Your session has expired. Please log in again.');
                    window.location.href = '/login';
                    return Promise.reject(err);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default api;
