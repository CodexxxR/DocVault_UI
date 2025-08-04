import React, { useEffect, useState } from "react";
import { userManager } from "../auth/AuthService";
import { getUserRoles } from "../utils/getUserRoles";
import UserPermissions from "../components/UserPermission";
import "../styles/adminPage.css";
import LoginHeader from "../components/LoginHeader";
import NavBar from "../components/NavBar";

interface UserInfo {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canAdd: boolean;
  };
}


const AdminPage = () => {
    const [user, setUser] = useState<any>(null);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    userManager.getUser().then(async (currentUser) => {
      setAdmin(currentUser);
      setUser(currentUser);
      const token = currentUser?.access_token;

      try {
        const res = await fetch("http://localhost:8080/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        const formattedUsers: UserInfo[] = data
          .filter((user: any) => user.roles.includes("ALL_USERS"))
          .map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            permissions: {
              canEdit: false,
              canDelete: false,
              canAdd: false,
            },
          }));

        setUsers(formattedUsers);
        console.log(formattedUsers)
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    });
  }, []);

  const roles = user ? getUserRoles(user) : [];
  const isAdmin = roles.includes("ADMIN");

  const handlePermissionChange = (
    userId: string,
    permissionKey: keyof UserInfo["permissions"],
    value: boolean
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: { ...user.permissions, [permissionKey]: value },
            }
          : user
      )
    );
  };

  
  const handleLogoutClick = () => {
    userManager.signoutRedirect({
        post_logout_redirect_uri: 'http://localhost:5173/login'
    });
  }

  return (
    <div className="admin-page">
        <div className="admin-header">
            <LoginHeader />
        </div>
        <div className="admin-body">
            <NavBar currentUserRole={isAdmin ? "ADMIN" : "ALL_USERS"} />
            <div className="admin-main">
                <h2>Admin Panel - Manage User Access</h2>
                <div className="admin-user-list">
                    {users.map((user) => (
                    <UserPermissions
                        key={user.id}
                        user={user}
                        onPermissionChange={handlePermissionChange}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminPage;
