import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Error from './components/Error';
import Workflow from './screens/Workflow';
import FlowDiagram from './screens/FlowDiagram';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={user ? <Navigate to="/workflow" /> : <Login />} />
        
        {/* Protected routes */}
        <Route path="/workflow" element={user ? <Workflow /> : <Navigate to="/" />} />
        <Route path="/flow" element={user ? <FlowDiagram /> : <Navigate to="/" />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;