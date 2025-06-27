import { userManager } from "../auth/AuthService";
import LoginHeader from "../components/LoginHeader";
import '../styles/dashboard.css';

const Dashboard = () => {

    const handleLogoutClick = () => {
        userManager.signoutRedirect({
            post_logout_redirect_uri: 'http://localhost:5173/login'
        });
    }
    return(
        <div className="dashboard-page">
            <div className="dashboard-header">
                <LoginHeader />
                <button className="logout-button" onClick={handleLogoutClick}>Log-Out</button>
            </div>
            <div className="dashboard-body">
                <div className="dashboard-navbar">NavBar Goes here</div>
                <div className="dashboard-main">
                    <div className="dashboard-file-table"> table for files</div>
                    <div className="dashboard-file-analysis"> Sidebar for analysis
                        <div className="dashboard-file-pie"> pie for file count</div>
                        <div className="dashboard-file-users"> user for file access</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default Dashboard;