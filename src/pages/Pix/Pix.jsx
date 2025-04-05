import { useLogin } from '../../context/LoginContext';

export const Pix = () => {
    const { logout } = useLogin();
    
    const handleLogout = () => {
        logout();
        history.push('/login');
    };
    
    return (
        <div className="pix">
        <h1>Pix</h1>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};