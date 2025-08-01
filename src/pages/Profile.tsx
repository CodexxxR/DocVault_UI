// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { userManager } from "../auth/AuthService";
import { getUserRoles } from "../utils/getUserRoles";
import LoginHeader from "../components/LoginHeader";
import NavBar from "../components/NavBar";
import { mockDocuments } from "../assets/mocks/documents";
import "../styles/profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    userManager.getUser().then((loadedUser) => {
      setUser(loadedUser);
    });
  }, []);

  const roles = user ? getUserRoles(user) : [];
  const isAdmin = roles.includes("ADMIN");
  const username = user?.profile?.preferred_username || "Unknown User";
  const email = user?.profile?.email || "Not available";

  const uploadedDocs = mockDocuments.filter(
    (doc) => doc.uploadedBy === username
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <LoginHeader />
      </div>
      <div className="profile-body">
        <NavBar currentUserRole={isAdmin ? "ADMIN" : "ALL_USERS"} />

        <div className="profile-main">
          <div className="user-info">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {isAdmin ? "Admin" : "User"}</p>
          </div>

          <div className="user-docs">
            <h3>Your Uploaded Documents</h3>
            {uploadedDocs.length > 0 ? (
              <div className="user-docs-grid">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="profile-doc-card">
                    <h4>{doc.title}</h4>
                    <p><strong>Type:</strong> {doc.docType}</p>
                    <p><strong>Tags:</strong> {doc.tags.join(", ")}</p>
                    <p><strong>Uploaded:</strong> {new Date(doc.uploadedAt).toLocaleString()}</p>
                    <Link to="/dashboard" className="manage-link">Manage in Dashboard</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>You haven’t uploaded any documents yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
