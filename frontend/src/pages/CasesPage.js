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
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import caseService from '../services/caseService';

const CasesPage = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCase, setEditingCase] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [formData, setFormData] = useState({
        crimeReportId: '',
        assignedToId: '',
        status: 'Open',
        notes: ''
    });

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        setLoading(true);
        try {
            const data = await caseService.getAllCases();
            setCases(data);
        } catch (error) {
            console.error('Failed to load cases:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCase) {
                await caseService.updateCase(editingCase.id, formData);
            } else {
                await caseService.createCase(formData);
            }
            setOpenDialog(false);
            setEditingCase(null);
            resetForm();
            loadCases();
        } catch (error) {
            console.error('Failed to save case:', error);
        }
    };

    const handleEdit = (caseItem) => {
        setEditingCase(caseItem);
        setFormData({
            crimeReportId: caseItem.crimeReport?.id || '',
            assignedToId: caseItem.assignedTo?.id || '',
            status: caseItem.status,
            notes: caseItem.notes || ''
        });
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            try {
                await caseService.deleteCase(id);
                loadCases();
            } catch (error) {
                console.error('Failed to delete case:', error);
            }
        }
    };

    const handleCloseCase = async (id) => {
        try {
            await caseService.closeCase(id);
            loadCases();
        } catch (error) {
            console.error('Failed to close case:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            crimeReportId: '',
            assignedToId: '',
            status: 'Open',
            notes: ''
        });
    };

    const filteredCases = cases.filter(caseItem => {
        const matchesSearch = caseItem.crimeReport?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            caseItem.notes?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'warning';
            case 'Closed': return 'success';
            case 'Under Investigation': return 'info';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Case Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    New Case
                </Button>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Search cases"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="text.secondary">
                            {filteredCases.length} cases found
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Cases Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Case ID</TableCell>
                            <TableCell>Crime Report</TableCell>
                            <TableCell>Assigned To</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Opened Date</TableCell>
                            <TableCell>Closed Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                                <TableCell>#{caseItem.id}</TableCell>
                                <TableCell>
                                    {caseItem.crimeReport?.title}
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        {caseItem.crimeReport?.description?.substring(0, 50)}...
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {caseItem.assignedTo?.fullName || 'Unassigned'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caseItem.status}
                                        color={getStatusColor(caseItem.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(caseItem.openedAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {caseItem.closedAt ? new Date(caseItem.closedAt).toLocaleDateString() : '-'}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(caseItem)}>
                                        <EditIcon />
                                    </IconButton>
                                    {caseItem.status !== 'Closed' && (
                                        <IconButton 
                                            onClick={() => handleCloseCase(caseItem.id)}
                                            color="success"
                                        >
                                            <CheckCircleIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(caseItem.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingCase ? 'Edit Case' : 'New Case'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Crime Report ID"
                                    type="number"
                                    value={formData.crimeReportId}
                                    onChange={(e) => setFormData({...formData, crimeReportId: e.target.value})}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Assigned To (User ID)"
                                    type="number"
                                    value={formData.assignedToId}
                                    onChange={(e) => setFormData({...formData, assignedToId: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Status"
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={4}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCase ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CasesPage; 