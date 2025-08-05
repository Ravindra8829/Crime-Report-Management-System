import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip,
    Grid,
    Card,
    CardContent,
    Alert,
    Tabs,
    Tab
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Security as SecurityIcon,
    Settings as SettingsIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import userService from '../services/userService';
import authService from '../services/authService';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [systemStats, setSystemStats] = useState({});

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        roleId: '',
        departmentId: '',
        isActive: true
    });

    useEffect(() => {
        loadUsers();
        loadSystemStats();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSystemStats = () => {
        // Mock system stats - in real app, this would come from API
        setSystemStats({
            totalUsers: users.length,
            activeUsers: users.filter(u => u.isActive).length,
            adminUsers: users.filter(u => u.role?.name === 'ADMIN').length,
            officerUsers: users.filter(u => u.role?.name === 'OFFICER').length,
            analystUsers: users.filter(u => u.role?.name === 'ANALYST').length
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await userService.updateUser(editingUser.id, formData);
            } else {
                await userService.createUser(formData);
            }
            setOpenDialog(false);
            setEditingUser(null);
            resetForm();
            loadUsers();
        } catch (error) {
            console.error('Failed to save user:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            password: '',
            fullName: user.fullName,
            email: user.email,
            phone: user.phone || '',
            roleId: user.role?.id || '',
            departmentId: user.department?.id || '',
            isActive: user.isActive
        });
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            password: '',
            fullName: '',
            email: '',
            phone: '',
            roleId: '',
            departmentId: '',
            isActive: true
        });
    };

    const getRoleColor = (roleName) => {
        switch (roleName) {
            case 'ADMIN': return 'error';
            case 'OFFICER': return 'primary';
            case 'ANALYST': return 'info';
            default: return 'default';
        }
    };

    const StatCard = ({ title, value, icon, color }) => (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography color="textSecondary" gutterBottom variant="h6">
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {value}
                        </Typography>
                    </Box>
                    <Box sx={{ color: color }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>

            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="System Overview" />
                    <Tab label="User Management" />
                    <Tab label="System Settings" />
                </Tabs>
            </Paper>

            {tabValue === 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        System Overview
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Total Users"
                                value={systemStats.totalUsers || 0}
                                icon={<PersonIcon fontSize="large" />}
                                color="primary.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Active Users"
                                value={systemStats.activeUsers || 0}
                                icon={<PersonIcon fontSize="large" />}
                                color="success.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Admin Users"
                                value={systemStats.adminUsers || 0}
                                icon={<SecurityIcon fontSize="large" />}
                                color="error.main"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Officers"
                                value={systemStats.officerUsers || 0}
                                icon={<PersonIcon fontSize="large" />}
                                color="info.main"
                            />
                        </Grid>
                    </Grid>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            System Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>System Version:</strong> CRMS v1.0.0
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Database:</strong> MySQL 8.0
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Backend:</strong> Spring Boot 3.2.5
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Frontend:</strong> ReactJS 18.2.0
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Security:</strong> JWT Authentication
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}

            {tabValue === 1 && (
                <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6">User Management</Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialog(true)}
                        >
                            Add User
                        </Button>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role?.name}
                                                color={getRoleColor(user.role?.name)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{user.department?.name || '-'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.isActive ? 'Active' : 'Inactive'}
                                                color={user.isActive ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Add/Edit User Dialog */}
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                        <DialogTitle>
                            {editingUser ? 'Edit User' : 'Add New User'}
                        </DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            value={formData.username}
                                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            required={!editingUser}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Role</InputLabel>
                                            <Select
                                                value={formData.roleId}
                                                label="Role"
                                                onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                                                required
                                            >
                                                <MenuItem value={1}>ADMIN</MenuItem>
                                                <MenuItem value={2}>OFFICER</MenuItem>
                                                <MenuItem value={3}>ANALYST</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                value={formData.isActive}
                                                label="Status"
                                                onChange={(e) => setFormData({...formData, isActive: e.target.value})}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>Inactive</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button onClick={handleSubmit} variant="contained">
                                {editingUser ? 'Update' : 'Create'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}

            {tabValue === 2 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        System Settings
                    </Typography>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="body1" color="textSecondary">
                            System settings and configuration options will be available here.
                        </Typography>
                    </Paper>
                </Box>
            )}
        </Container>
    );
};

export default AdminPage; 