import React from "react";
import "../styles/userPermissions.css";

interface UserPermissionsProps {
  user: {
    id: string;
    username: string;
    email: string;
    permissions: {
      canEdit: boolean;
      canDelete: boolean;
      canAdd: boolean;
    };
  };
  onPermissionChange: (
    userId: string,
    permissionKey: keyof UserPermissionsProps["user"]["permissions"],
    value: boolean
  ) => void;
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ user, onPermissionChange }) => {
  const { id, username, email, permissions } = user;

  return (
    <div className="user-permissions-card">
      <div className="user-info">
        <h4>{username}</h4>
        <p>{email}</p>
      </div>
      <div className="permissions-toggles">
        {["canEdit", "canDelete", "canAdd"].map((perm) => (
          <label key={perm}>
            <input
              type="checkbox"
              checked={permissions[perm as keyof typeof permissions]}
              onChange={(e) =>
                onPermissionChange(id, perm as keyof typeof permissions, e.target.checked)
              }
            />
            {perm.replace("can", "")}
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserPermissions;
