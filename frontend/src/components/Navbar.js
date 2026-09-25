import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Chip
} from '@mui/material';
import {
    LocalPolice as PoliceIcon,
    Dashboard as DashboardIcon,
    Report as ReportIcon,
    Assignment as CaseIcon,
    Analytics as AnalyticsIcon,
    Message as MessageIcon,
    AdminPanelSettings as AdminIcon,
    AccountCircle,
    Logout as LogoutIcon
} from '@mui/icons-material';
import authService from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = authService.getCurrentUser();
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Hide navbar on login page
    if (location.pathname === '/login' || !authService.isAuthenticated()) {
        return null;
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['ADMIN', 'OFFICER', 'ANALYST'] },
        { title: 'Reports', path: '/reports', icon: <ReportIcon />, roles: ['ADMIN', 'OFFICER', 'ANALYST'] },
        { title: 'Cases', path: '/cases', icon: <CaseIcon />, roles: ['ADMIN', 'OFFICER', 'ANALYST'] },
        { title: 'Messaging', path: '/messages', icon: <MessageIcon />, roles: ['ADMIN', 'OFFICER', 'ANALYST'] },
        { title: 'Analytics', path: '/analytics', icon: <AnalyticsIcon />, roles: ['ADMIN', 'ANALYST'] },
        { title: 'Admin', path: '/admin', icon: <AdminIcon />, roles: ['ADMIN'] }
    ];

    const allowedNavItems = navItems.filter(item => 
        item.roles.includes(currentUser?.role)
    );

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'error';
            case 'OFFICER': return 'primary';
            case 'ANALYST': return 'info';
            default: return 'default';
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1e293b' }}>
            <Toolbar>
                <PoliceIcon sx={{ mr: 1, color: '#38bdf8' }} />
                <Typography
                    variant="h6"
                    component={Link}
                    to="/dashboard"
                    sx={{
                        mr: 3,
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                        letterSpacing: '.05rem'
                    }}
                >
                    CRMS
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                    {allowedNavItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    color: isActive ? '#38bdf8' : '#e2e8f0',
                                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                    },
                                    textTransform: 'none',
                                    fontWeight: isActive ? 600 : 400
                                }}
                            >
                                {item.title}
                            </Button>
                        );
                    })}
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                        label={currentUser?.role || 'USER'}
                        color={getRoleColor(currentUser?.role)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                    <Typography variant="body2" sx={{ color: '#e2e8f0', mr: 1 }}>
                        {currentUser?.username}
                    </Typography>

                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>
                            Signed in as {currentUser?.username}
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
