import { useEffect, useState } from "react";
import { userManager } from "../auth/AuthService";
import LoginHeader from "../components/LoginHeader";
import NavBar from "../components/NavBar";
import '../styles/dashboard.css';
import { getUserRoles } from "../utils/getUserRoles";
import { FaPlus } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        userManager.getUser().then(loadedUser => {
            setUser(loadedUser);
        });
    }, []);
    
    const roles = user ? getUserRoles(user) : [];
    const isAdmin = roles.includes("ADMIN");

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
                <NavBar currentUserRole={isAdmin ? "ADMIN" : "ALL_USERS"} />
                <div className="dashboard-main">
                    <div className="dashboard-grid">
                        <div className="doc-search">
                            <input placeholder="search for docs.." />
                            <button className="filter-btn">
                                <FaFilter />
                                <span className="filter-btn-txt">Filter</span>
                            </button>
                        </div>
                        <div className="new-doc-btn">
                            <button className="add-btn">
                                <FaPlus /> 
                                <span className="add-btn-txt">Add Document</span>
                            </button>
                        </div>
                        <div className="document-cards">
                            <div className="document-card">Card 1</div>
                            <div className="document-card">Card 2</div>
                            <div className="document-card">Card 3</div>
                            <div className="document-card">Card 4</div>
                        </div>
                    </div>
                    <div className="activity-bar">
                        <div className="activity-header">Recent Activity</div>
                        <div className="activity-tiles">.....</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;