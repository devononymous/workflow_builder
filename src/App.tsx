
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentUser, selectIsAuthenticated, logoutUser } from './store/slices/authSlice';
import Loading from './components/Loading';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Lazy-loaded components
const Login = lazy(() => import('./screens/Login'));
const Workflow = lazy(() => import('./screens/Workflow'));
const FlowDiagram = lazy(() => import('./screens/FlowDiagram'));
const Error = lazy(() => import('./components/Error'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <Router>
      {/* Logout Button - only shown when authenticated */}
      {isAuthenticated && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleLogout}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 22,
            zIndex: 1000,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'common.white'
            }
          }}
        >
          <ExitToAppIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </Button>
      )}

      <Suspense fallback={<Loading fullScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/workflow" replace /> : <Login />
          } />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/workflow" replace /> : <Login />
          } />

          {/* Protected routes */}
          <Route path="/workflow" element={
            isAuthenticated ? <Workflow /> : <Navigate to="/login" replace />
          } />
          <Route path="/workflow/:id" element={
            isAuthenticated ? <FlowDiagram /> : <Navigate to="/login" replace />
          } />

          {/* Error handling */}
          <Route path="/error" element={<Error />} />
          <Route path="*" element={
            isAuthenticated 
              ? <Navigate to="/workflow" replace /> 
              : <Navigate to="/login" replace />
          } />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;