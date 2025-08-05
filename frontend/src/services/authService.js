import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

class AuthService {
    async login(username, password) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    username: response.data.username,
                    role: response.data.role
                }));
            }
            
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'ADMIN';
    }

    isAnalyst() {
        const user = this.getCurrentUser();
        return user && (user.role === 'ANALYST' || user.role === 'ADMIN');
    }
}

export default new AuthService();