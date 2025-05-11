import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    console.log('useAuth context:', context); // Debugging line
    return { isAuthenticated: !!context.user, login: context.login, logout: context.logout };
};