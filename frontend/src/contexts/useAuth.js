import {createContext, useContext, useState, useEffect} from 'react'
import { get_auth } from '../api/endpoints';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api/endpoints';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();
    const check_auth = async () => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            setAuth(false);
            setAuthLoading(false);
            return;
        }

        try {
            await get_auth();
            setAuth(true)
        } catch {
            setAuth(false);
            localStorage.removeItem('userData');
        } finally {
            setAuthLoading(false)
        }
    }
    const auth_login = async (username, password) => {
        try {
            const data = await login(username, password);
          
            if (data.success) {
              setAuth(true)
              const userData = {
                "username":data.user.username,
                "bio":data.user.bio,
                "email":data.user.email,
                "first_name":data.user.first_name,
                "last_name":data.user.last_name,
              }
              localStorage.setItem('userData', JSON.stringify(userData))
              navigate(`/${username}`);
            } else {
              alert(data.error || 'invalid username or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.detail || err.response?.data?.error || 'Invalid username or password';
            alert(errorMessage);
        }
    };
    useEffect(() => {
        check_auth()        
    }, [location])

    return (
        <AuthContext.Provider value={{auth, authLoading, auth_login}}>
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);