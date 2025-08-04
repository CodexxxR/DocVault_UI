import { useEffect, useState } from 'react';
import { userManager } from '../auth/AuthService';
import '../styles/loginPage.css';
import { getUserRoles } from '../utils/getUserRoles';
import { FaStar } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';

const LoginHeader = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        userManager.getUser().then((loadedUser) => {
            setUser(loadedUser);
        });
        console.log(user?.profile)
    }, []);
    const handleLogoutClick = () => {
        userManager.signoutRedirect({
            post_logout_redirect_uri: 'http://localhost:5173/login'
        });
    }
    const username = user?.profile?.preferred_username || "Unknown User";
    const roles = user ? getUserRoles(user) : [];
    const isAdmin = roles.includes("ADMIN");

    return(
        <header className="login-header">
            <div className="logo">🗂️ <span className="logo-text">Doc<span>Vault</span></span>
            </div>
            <div className="welcome-logout">
                <span>{isAdmin? <FaStar className='admin-icon' data-tooltip-id="my-tooltip2" data-tooltip-content="Admin User" /> : <div></div>}<strong>Welcome, {username}</strong></span>
                <Tooltip 
                    id="my-tooltip2"
                    place="left"
                    style={{ backgroundColor: "rgba(108, 108, 255, 0.77)", color: "#fff", borderRadius: '4px', fontSize: '12px' }}
                />
                <button className="logout-btn" onClick={handleLogoutClick}>Log-Out</button>
            </div>

        </header>
    )
};

export default LoginHeader;