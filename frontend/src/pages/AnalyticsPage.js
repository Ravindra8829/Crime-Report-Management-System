import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {
    TrendingUp,
    Assignment,
    Person,
    CheckCircle,
    Warning,
    Info
} from '@mui/icons-material';
import analyticsService from '../services/analyticsService';

const AnalyticsPage = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [trends, setTrends] = useState({});
    const [caseStats, setCaseStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const [dashboard, trendsData, stats] = await Promise.all([
                analyticsService.getDashboardData(),
                analyticsService.getCrimeTrends(),
                analyticsService.getCaseResolutionStats()
            ]);
            setDashboardData(dashboard);
            setTrends(trendsData);
            setCaseStats(stats);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon, color, subtitle }) => (
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
                        {subtitle && (
                            <Typography variant="body2" color="textSecondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ color: color }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    const ProgressCard = ({ title, value, total, color, subtitle }) => {
        const percentage = total > 0 ? (value / total) * 100 : 0;
        return (
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {subtitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={percentage} 
                                sx={{ height: 8, borderRadius: 4 }}
                            />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="textSecondary">
                                {`${Math.round(percentage)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <LinearProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Analytics & Dashboard
            </Typography>

            {/* Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Reports"
                        value={dashboardData.totalReports || 0}
                        icon={<TrendingUp fontSize="large" />}
                        color="primary.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Cases"
                        value={dashboardData.totalCases || 0}
                        icon={<Assignment fontSize="large" />}
                        color="info.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Users"
                        value={dashboardData.totalUsers || 0}
                        icon={<Person fontSize="large" />}
                        color="success.main"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Recent Reports"
                        value={dashboardData.recentReports || 0}
                        icon={<Info fontSize="large" />}
                        color="warning.main"
                        subtitle="Last 30 days"
                    />
                </Grid>
            </Grid>

            {/* Status Breakdown */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <ProgressCard
                        title="Open Reports"
                        value={dashboardData.openReports || 0}
                        total={dashboardData.totalReports || 1}
                        color="warning.main"
                        subtitle="Reports awaiting investigation"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProgressCard
                        title="Closed Reports"
                        value={dashboardData.closedReports || 0}
                        total={dashboardData.totalReports || 1}
                        color="success.main"
                        subtitle="Reports resolved"
                    />
                </Grid>
            </Grid>

            {/* Case Resolution Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <ProgressCard
                        title="Open Cases"
                        value={dashboardData.openCases || 0}
                        total={dashboardData.totalCases || 1}
                        color="warning.main"
                        subtitle="Cases under investigation"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProgressCard
                        title="Closed Cases"
                        value={dashboardData.closedCases || 0}
                        total={dashboardData.totalCases || 1}
                        color="success.main"
                        subtitle="Cases resolved"
                    />
                </Grid>
            </Grid>

            {/* Case Resolution Statistics */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Case Resolution Statistics
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Resolution Rate
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {caseStats.resolutionRate ? `${caseStats.resolutionRate.toFixed(1)}%` : '0%'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Cases successfully resolved
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Average Resolution Time
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {caseStats.avgResolutionTime ? `${caseStats.avgResolutionTime.toFixed(1)} days` : '0 days'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Average time to close cases
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Total Cases
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {caseStats.totalCases || 0}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    All cases in system
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Crime Category Breakdown */}
            {trends.categoryBreakdown && (
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Crime Category Breakdown
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Count</TableCell>
                                    <TableCell>Percentage</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(trends.categoryBreakdown).map(([category, count]) => (
                                    <TableRow key={category}>
                                        <TableCell>{category}</TableCell>
                                        <TableCell>{count}</TableCell>
                                        <TableCell>
                                            {dashboardData.totalReports ? 
                                                `${((count / dashboardData.totalReports) * 100).toFixed(1)}%` : 
                                                '0%'
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}

            {/* Monthly Trends */}
            {trends.monthlyTrends && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Monthly Crime Trends (Last 6 Months)
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(trends.monthlyTrends).map(([month, count]) => (
                            <Grid item xs={6} sm={4} md={2} key={month}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" component="div">
                                            {count}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {month}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}
        </Container>
    );
};

export default AnalyticsPage; 