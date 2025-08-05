import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    TextField,
    Button,
    Divider,
    Chip,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Send as SendIcon,
    Person as PersonIcon,
    Message as MessageIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    MarkEmailRead as MarkReadIcon
} from '@mui/icons-material';
import messageService from '../services/messageService';
import userService from '../services/userService';
import authService from '../services/authService';

const MessagingPage = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [openCompose, setOpenCompose] = useState(false);
    const [composeData, setComposeData] = useState({
        receiverId: '',
        subject: '',
        content: ''
    });
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        loadMessages();
        loadUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            loadConversation();
        }
    }, [selectedUser]);

    const loadMessages = async () => {
        try {
            const data = await messageService.getAllMessages();
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const loadUsers = async () => {
        try {
            const data = await userService.getAllUsers();
            setUsers(data.filter(user => user.id !== currentUser?.id));
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const loadConversation = async () => {
        if (!selectedUser) return;
        try {
            const data = await messageService.getMessagesBetweenUsers(currentUser?.id, selectedUser.id);
            setConversation(data);
        } catch (error) {
            console.error('Failed to load conversation:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedUser) return;
        
        try {
            const messageData = {
                receiverId: selectedUser.id,
                senderId: currentUser?.id,
                content: newMessage,
                subject: 'Direct Message'
            };
            
            await messageService.createMessage(messageData);
            setNewMessage('');
            loadConversation();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleComposeMessage = async () => {
        try {
            const messageData = {
                receiverId: composeData.receiverId,
                senderId: currentUser?.id,
                subject: composeData.subject,
                content: composeData.content
            };
            
            await messageService.createMessage(messageData);
            setOpenCompose(false);
            setComposeData({ receiverId: '', subject: '', content: '' });
            loadMessages();
        } catch (error) {
            console.error('Failed to compose message:', error);
        }
    };

    const handleMarkAsRead = async (messageId) => {
        try {
            await messageService.markAsRead(messageId);
            loadMessages();
        } catch (error) {
            console.error('Failed to mark message as read:', error);
        }
    };

    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };

    const getUnreadCount = (userId) => {
        return messages.filter(msg => 
            msg.receiverId === currentUser?.id && 
            msg.senderId === userId && 
            !msg.isRead
        ).length;
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Inter-Agency Communication</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenCompose(true)}
                >
                    Compose Message
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Users List */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ height: '70vh', overflow: 'auto' }}>
                        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                            <Typography variant="h6">Contacts</Typography>
                        </Box>
                        <List>
                            {users.map((user) => {
                                const unreadCount = getUnreadCount(user.id);
                                return (
                                    <ListItem
                                        key={user.id}
                                        button
                                        selected={selectedUser?.id === user.id}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.fullName}
                                            secondary={user.role?.name}
                                        />
                                        {unreadCount > 0 && (
                                            <Chip
                                                label={unreadCount}
                                                color="primary"
                                                size="small"
                                            />
                                        )}
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>

                {/* Conversation Area */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
                        {selectedUser ? (
                            <>
                                {/* Conversation Header */}
                                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                                    <Typography variant="h6">
                                        Conversation with {selectedUser.fullName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {selectedUser.role?.name} • {selectedUser.department?.name}
                                    </Typography>
                                </Box>

                                {/* Messages */}
                                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                                    {conversation.map((message) => {
                                        const isOwnMessage = message.senderId === currentUser?.id;
                                        return (
                                            <Box
                                                key={message.id}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                                                    mb: 2
                                                }}
                                            >
                                                <Card
                                                    sx={{
                                                        maxWidth: '70%',
                                                        backgroundColor: isOwnMessage ? 'primary.main' : 'grey.100',
                                                        color: isOwnMessage ? 'white' : 'text.primary'
                                                    }}
                                                >
                                                    <CardContent sx={{ py: 1, px: 2 }}>
                                                        <Typography variant="body2">
                                                            {message.content}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: isOwnMessage ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                                                display: 'block',
                                                                mt: 0.5
                                                            }}
                                                        >
                                                            {new Date(message.sentAt).toLocaleString()}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        );
                                    })}
                                </Box>

                                {/* Message Input */}
                                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <TextField
                                                fullWidth
                                                placeholder="Type your message..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                onClick={handleSendMessage}
                                                disabled={!newMessage.trim()}
                                                startIcon={<SendIcon />}
                                            >
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <Typography variant="h6" color="textSecondary">
                                    Select a contact to start messaging
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Compose Message Dialog */}
            <Dialog open={openCompose} onClose={() => setOpenCompose(false)} maxWidth="md" fullWidth>
                <DialogTitle>Compose New Message</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>To</InputLabel>
                                    <Select
                                        value={composeData.receiverId}
                                        label="To"
                                        onChange={(e) => setComposeData({...composeData, receiverId: e.target.value})}
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.id} value={user.id}>
                                                {user.fullName} ({user.role?.name})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    value={composeData.subject}
                                    onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    multiline
                                    rows={6}
                                    value={composeData.content}
                                    onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCompose(false)}>Cancel</Button>
                    <Button 
                        onClick={handleComposeMessage} 
                        variant="contained"
                        disabled={!composeData.receiverId || !composeData.content.trim()}
                    >
                        Send Message
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MessagingPage; 