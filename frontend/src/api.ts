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

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        const url = originalRequest.url || '';

        if (err.response?.status === 401 && url === '/users/me') {
            return Promise.reject(err);
        }

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshClient.post('/auth/refresh');
                return api(originalRequest);
            } catch (refreshErr) {
                toast.error('Your session has expired. Please log in again.', {
                    id: 'session-expired',
                });

                const publicPaths = ['/login', '/signup', '/start'];
                if (!publicPaths.includes(window.location.pathname)) {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default api;
