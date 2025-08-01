import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocPreviewModal from "../components/DocPreviewModal"; // reuse modal
import { mockDocuments } from "../assets/mocks/documents";
import LoginHeader from "../components/LoginHeader";
import NavBar from "../components/NavBar";
import { userManager } from "../auth/AuthService";
import { getUserRoles } from "../utils/getUserRoles";
import "../styles/docPreviewUpload.css"
import FileUploader from "../components/FileUploader";

const DocumentPreviewUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [user, setUser] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userManager.getUser().then(loadedUser => {
            setUser(loadedUser);
        });
        console.log(getUserRoles(user));
    }, []);

    const roles = user ? getUserRoles(user) : [];
    const isAdmin = roles.includes("ADMIN");
    const handleSubmit = () => {
        if (!file || !title) return alert("Title and file required");

        const uploadedBy = "currentUser"; // Replace with real user
        const uploadedAt = new Date().toISOString();
        const extensionMatch = file.name.match(/\.(\w+)$/);
        const docType = extensionMatch ? extensionMatch[1].toLowerCase() : "unknown";

        const newDoc = {
        id: `doc-${Date.now()}`,
        title,
        tags: tags.split(",").map(t => t.trim()),
        file,
        docType,
        uploadedBy,
        uploadedAt,
        adminOnly: "false"
        };

        mockDocuments.push(newDoc); // temporary mock push
        alert("Document uploaded!");
        navigate("/dashboard");
    };

    const handleLogoutClick = () => {
        userManager.signoutRedirect({
            post_logout_redirect_uri: 'http://localhost:5173/login'
        });
    }

  return (
    <div className="preview-page">
        <div className="preview-header">
            <LoginHeader />
            <button className="logout-button" onClick={handleLogoutClick}>Log-Out</button>
        </div>
        <div className="preview-body">
            <NavBar currentUserRole={isAdmin ? "ADMIN" : "ALL_USERS"} />
            <div className="preview-main">
                <div className="preview-grid-header">
                    <h2>Upload with Preview</h2>
                </div>
                <div className="preview-grid">
                    <div className="document-form">
                        <input type="text" placeholder="Document Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
                        <div className="doc-file-upload">
                            <FileUploader onFileSelect={(file: React.SetStateAction<File | null>) => setFile(file)} />
                        </div>
                        <div className="doc-btn-group">
                            <button  disabled={!file} onClick={() => setShowPreview(true)}>Preview</button>
                            <button onClick={handleSubmit} disabled={!file || !title}>Upload Document</button>
                        </div>
                    </div>
                    <div className="document-preview">
                        {file && showPreview && <DocPreviewModal file={file} onClose={() => setShowPreview(false)} />}
                        {!showPreview && <div className="preview-placeholder"><p>PlaceHolder Text for Preview!!</p></div>}
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default DocumentPreviewUpload;
