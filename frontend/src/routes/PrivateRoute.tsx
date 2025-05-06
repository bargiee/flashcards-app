import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Loader2 } from 'lucide-react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isChecking } = useAuth();

    if (isChecking) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="size-10 animate-spin" />
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
