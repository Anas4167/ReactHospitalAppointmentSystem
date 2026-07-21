import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const { isAuthenticated, role, loading } = useAuth();
   
    // Wait for AuthContext to restore token
    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading...

            </div>

        );

    }
    
    // User not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // Role protection
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;