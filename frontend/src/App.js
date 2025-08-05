import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// ...existing code...
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import CasesPage from './pages/CasesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';
import MessagingPage from './pages/MessagingPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/messages" element={<MessagingPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App; 