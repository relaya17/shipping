import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactElement;
  roles?: string[];
};

/**
 * Route guard — requires authentication and optional role list (e.g. admin).
 */
const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="container py-5 text-center" role="status">
        {t('common.loading')}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length) {
    const role = user?.role || '';
    if (!roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
