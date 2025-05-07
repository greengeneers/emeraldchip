import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Dashboard.jsx';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import ProfileModal from './components/profile-modal';
import EventsTest from './pages/EventsTest';
import Landing from './pages/Landing.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import GuestRoutes from './components/GuestRoutes.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      // we aren't concerned about an error happening here
      const [data] = await checkForLoggedInUser();
      if (data) setCurrentUser(data);
      setIsLoading(false);
    };
    loadCurrentUser();
  }, [setCurrentUser]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <main>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/test-modal' element={<ProfileModal onClose={() => window.history.back()} />}
            />
            <Route path='/events' element={<EventsTest />} />
          </Route>

          <Route element={<GuestRoutes />}>
            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
