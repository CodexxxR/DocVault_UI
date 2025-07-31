import '../styles/navBar.css';
import menuItems from '../assets/menu.json';
import { Link } from 'react-router-dom';

interface navBarProps {
    currentUserRole: string
}

const NavBar: React.FC<navBarProps> = ({currentUserRole}) => {
    return (
        <div 
            className="nav-bar"
            style={{ width: currentUserRole === "ALL_USERS" ? "50vw" : "60vw" }}>
            {menuItems
                .filter(item => item.permission === 'ALL_USERS' || item.permission === currentUserRole)
                .map((item, index) => (
                <Link 
                    key={index} 
                    to={`/${item.name.toLowerCase()}`}
                    className="nav-link"
                >
                    <div className='nav-item'>{item.name}</div>
                </Link>
                ))
            }
        </div>
    )
};

export default NavBar;