import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/user-context';
import { useContext } from 'react';

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default ProtectedRoutes;
