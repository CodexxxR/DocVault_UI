import { userManager } from '../auth/AuthService';
import LoginHeader from '../components/LoginHeader';
import '../styles/loginPage.css';

const LoginPage = () => {

    const handleLoginClick = () => {
        userManager.signinRedirect();
    }

    return (
        <div className="login-page">
            <LoginHeader />
            <main className="login-main">
                <div className="login-card">
                <div className='logo'>🗂️</div>
                <h1>Welcome to DocVault!</h1>
                <p className="subtitle">
                    Please Login with SSO in order to unlock all the features DocVault has to offer. We will keep your personal information safe and secure.
                </p>
                <button className="sso-button" onClick={handleLoginClick}>Login with SSO</button>

                <div className="features">
                    <div className="feature">
                    <div className="icon">👤</div>
                    <h3>Manage Documents</h3>
                    <p>Add pdfs, texts, excels, .., apply tags, filters, sort, share with your team all inside a single app.</p>
                    </div>
                    <div className="feature">
                    <div className="icon">💬</div>
                    <h3>Engage Your Team</h3>
                    <p>Make users and admins, and send docs to you team selectively.</p>
                    </div>
                    <div className="feature">
                    <div className="icon">🔒</div>
                    <h3>Safe and Secure</h3>
                    <p>All your Documents are securely stored and managed by You.</p>
                    </div>
                </div>

                <footer className="footer">
                    <p>Smarter way to manage your Documents within your Team</p>
                    <small>© {new Date().getFullYear()} DocVault. All rights reserved.</small>
                    <small className="disclaimer">
                        Disclaimer: DocVault is coompletely developed by @Robin..
                    </small>
                </footer>
                </div>
            </main>
        </div>
    )
};

export default LoginPage;