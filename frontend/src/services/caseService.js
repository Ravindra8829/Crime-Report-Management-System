import api from './api';

class CaseService {
    async getAllCases() {
        try {
            const response = await api.get('/cases');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch cases');
        }
    }

    async getCaseById(id) {
        try {
            const response = await api.get(`/cases/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch case');
        }
    }

    async createCase(caseData) {
        try {
            const response = await api.post('/cases', caseData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create case');
        }
    }

    async updateCase(id, caseData) {
        try {
            const response = await api.put(`/cases/${id}`, caseData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update case');
        }
    }

    async deleteCase(id) {
        try {
            await api.delete(`/cases/${id}`);
        } catch (error) {
            throw new Error('Failed to delete case');
        }
    }

    async getCasesByStatus(status) {
        try {
            const response = await api.get(`/cases/status/${status}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch cases by status');
        }
    }

    async getCasesByAssignedTo(assignedToId) {
        try {
            const response = await api.get(`/cases/assigned/${assignedToId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch cases by assigned user');
        }
    }

    async closeCase(id) {
        try {
            const response = await api.put(`/cases/${id}/close`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to close case');
        }
    }
}

export default new CaseService(); 