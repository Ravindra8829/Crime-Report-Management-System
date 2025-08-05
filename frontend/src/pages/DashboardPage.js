import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActions,
    Button
} from '@mui/material';
import {
    Report,
    Assignment,
    Analytics,
    Message,
    AdminPanelSettings,
    Person
} from '@mui/icons-material';
import authService from '../services/authService';

const DashboardPage = () => {
    const user = authService.getCurrentUser();

    const dashboardItems = [
        {
            title: 'Crime Reports',
            description: 'View and manage crime reports',
            icon: <Report />,
            path: '/reports',
            roles: ['ADMIN', 'OFFICER', 'ANALYST']
        },
        {
            title: 'Case Management',
            description: 'Manage ongoing cases and assignments',
            icon: <Assignment />,
            path: '/cases',
            roles: ['ADMIN', 'OFFICER', 'ANALYST']
        },
        {
            title: 'Analytics',
            description: 'View crime statistics and trends',
            icon: <Analytics />,
            path: '/analytics',
            roles: ['ADMIN', 'ANALYST']
        },
        {
            title: 'Messaging',
            description: 'Inter-agency communication',
            icon: <Message />,
            path: '/messages',
            roles: ['ADMIN', 'OFFICER', 'ANALYST']
        },
        {
            title: 'Admin Panel',
            description: 'System administration and user management',
            icon: <AdminPanelSettings />,
            path: '/admin',
            roles: ['ADMIN']
        }
    ];

    const filteredItems = dashboardItems.filter(item => 
        item.roles.includes(user?.role)
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.username}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Crime Report Management System Dashboard
            </Typography>

            <Grid container spacing={3}>
                {filteredItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    {item.icon}
                                    <Typography variant="h6" sx={{ ml: 1 }}>
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Access
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DashboardPage; 