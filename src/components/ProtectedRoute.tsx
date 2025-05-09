import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';

type Role = 'guest' | 'client' | 'employee' | 'admin';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to='/login' />;
  if (!allowedRoles.includes(role)) return <Navigate to='/' />;

  return <>{children}</>;
};

export default ProtectedRoute;
