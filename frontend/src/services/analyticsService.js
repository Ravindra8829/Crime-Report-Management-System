import api from './api';

class AnalyticsService {
    async getDashboardData() {
        try {
            const response = await api.get('/analytics/dashboard');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch dashboard data');
        }
    }

    async getCrimeTrends() {
        try {
            const response = await api.get('/analytics/trends');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch crime trends');
        }
    }

    async getCaseResolutionStats() {
        try {
            const response = await api.get('/analytics/case-stats');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch case resolution stats');
        }
    }
}

export default new AnalyticsService(); 