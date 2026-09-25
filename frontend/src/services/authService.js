import axios from 'axios';

const getApiBaseUrl = () => {
    const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${host}:8081/api`;
};

class AuthService {
    async login(username, password) {
        try {
            const response = await axios.post(`${getApiBaseUrl()}/auth/login`, {
                username,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    username: response.data.username,
                    fullName: response.data.fullName,
                    role: response.data.role
                }));
            }
            
            return response.data;
        } catch (error) {
            const serverMsg = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null);
            throw new Error(serverMsg || error.message || 'Login failed. Please check your credentials.');
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