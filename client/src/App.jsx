import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import AdminPanel from './pages/AdminPanel';
import { ROUTES } from './constants';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME}      element={<Landing />} />
            <Route path={ROUTES.LOGIN}     element={<Login />} />
            <Route path={ROUTES.REGISTER}  element={<Register />} />
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/quiz/:quizId"    element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path={ROUTES.RESULTS}   element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
            <Route path={ROUTES.ADMIN}     element={<AdminRoute><AdminPanel /></AdminRoute>} />
            {/* Catch-all — redirect unknown routes to home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
