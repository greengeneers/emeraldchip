import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/current-user-context';
import { useContext } from 'react';

const GuestRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return !currentUser ? <Outlet /> : <Navigate to={'/dashboard'} replace />;
};

export default GuestRoutes;
