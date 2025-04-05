import { useAppSelector } from '@store/hooks';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) return <Navigate to={'/auth/login?message=Login-Required'} />;
  return <>{children}</>;
};

export const ProtectedAdminRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token, user } = useAppSelector((state) => state.auth);
  if (!token || user.role !== 'admin')
    return <Navigate to={'/auth/login?message=Login-Required'} />;
  return <>{children}</>;
};
