import api from './api';

class MessageService {
    async getAllMessages() {
        try {
            const response = await api.get('/messages');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch messages');
        }
    }

    async getMessageById(id) {
        try {
            const response = await api.get(`/messages/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch message');
        }
    }

    async createMessage(messageData) {
        try {
            const response = await api.post('/messages', messageData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create message');
        }
    }

    async deleteMessage(id) {
        try {
            await api.delete(`/messages/${id}`);
        } catch (error) {
            throw new Error('Failed to delete message');
        }
    }

    async getMessagesBySender(senderId) {
        try {
            const response = await api.get(`/messages/sender/${senderId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch messages by sender');
        }
    }

    async getMessagesByReceiver(receiverId) {
        try {
            const response = await api.get(`/messages/receiver/${receiverId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch messages by receiver');
        }
    }

    async getMessagesBetweenUsers(user1Id, user2Id) {
        try {
            const response = await api.get(`/messages/conversation/${user1Id}/${user2Id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch conversation');
        }
    }

    async getUnreadMessagesForUser(userId) {
        try {
            const response = await api.get(`/messages/unread/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch unread messages');
        }
    }

    async markAsRead(id) {
        try {
            const response = await api.put(`/messages/${id}/read`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to mark message as read');
        }
    }
}

export default new MessageService(); 