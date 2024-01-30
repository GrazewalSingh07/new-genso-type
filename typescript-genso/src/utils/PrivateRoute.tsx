// PrivateRoute.tsx

import React,{ReactNode} from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps  {
  isAuthenticated: boolean; 
  children: ReactNode// Add your authentication logic here
  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children 
}) => {
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
