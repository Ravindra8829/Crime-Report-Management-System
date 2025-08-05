import api from './api';

class ReportService {
    async getAllReports() {
        try {
            const response = await api.get('/reports');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch reports');
        }
    }

    async getReportById(id) {
        try {
            const response = await api.get(`/reports/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch report');
        }
    }

    async createReport(reportData) {
        try {
            const response = await api.post('/reports', reportData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create report');
        }
    }

    async updateReport(id, reportData) {
        try {
            const response = await api.put(`/reports/${id}`, reportData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update report');
        }
    }

    async deleteReport(id) {
        try {
            await api.delete(`/reports/${id}`);
        } catch (error) {
            throw new Error('Failed to delete report');
        }
    }

    async getReportsByStatus(status) {
        try {
            const response = await api.get(`/reports/status/${status}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch reports by status');
        }
    }

    async getReportsByCategory(categoryId) {
        try {
            const response = await api.get(`/reports/category/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch reports by category');
        }
    }
}

export default new ReportService(); 