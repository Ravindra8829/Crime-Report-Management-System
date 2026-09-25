import api from './api';

class UserService {
    async getAllUsers() {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async getUserById(id) {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    async createUser(userData) {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async updateUser(id, userData) {
        try {
            const response = await api.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async deleteUser(id) {
        try {
            await api.delete(`/users/${id}`);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async getUsersByRole(roleName) {
        try {
            const response = await api.get(`/users/role/${roleName}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users by role');
        }
    }

    async getActiveUsers() {
        try {
            const response = await api.get('/users/active');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch active users');
        }
    }

    async getRoles() {
        try {
            const response = await api.get('/roles');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch roles');
        }
    }

    async getDepartments() {
        try {
            const response = await api.get('/departments');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch departments');
        }
    }
}

export default new UserService(); 