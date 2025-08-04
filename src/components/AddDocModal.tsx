import React, { useEffect, useState } from "react";
import "../styles/addDocModal.css";
import { userManager } from "../auth/AuthService";

interface AddDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  mode?: "add" | "edit";
  initialData?: {
    title: string;
    tags: string[];
    fileName?: string; // For display only; actual file may not be present
  };
}

const AddDocModal: React.FC<AddDocModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialData,
}) => {
    const [title, setTitle] = useState("");
    const [user, setUser] = useState<any>(null);
    const [tags, setTags] = useState("");
    const [file, setFile] = useState<File | null>(null);
    useEffect(() => {
        if (isOpen) {
            if (mode === "edit" && initialData) {
            setTitle(initialData.title);
            setTags(initialData.tags.join(", "));
            // File stays null — we don't re-upload during edit
            } else {
            // Reset for add mode
            setTitle("");
            setTags("");
            setFile(null);
            }
        }
        }, [isOpen, mode, initialData]);
        useEffect(() => {
            userManager.getUser().then(loadedUser => {
                setUser(loadedUser);
            });
            // console.log(user.access_token);
        }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (file){
            formData.append("file", file);
        }
        formData.append("title", title);
        formData.append("tags", tags);

        try {
            const response = await fetch("http://localhost:8081/api/documents", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`, // Replace with actual token
                // 'Content-Type' should NOT be set manually when using FormData
            },
            body: formData,
            });

            if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Upload failed.");
            }

            const result = await response.json();
            console.log("Document uploaded:", result);
            // Close modal, show success, refresh document list, etc.
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("Upload failed: " + error.message);
            }

        onSubmit(formData);
        onClose();
        };


    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal">
            <h2>{mode === "edit" ? "Edit Document" : "Upload Document"}</h2>
            <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label>Tags (comma separated):</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            {mode === "add" ? (
                <>
                    <label>Upload File:</label>
                    <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    />
                </>
                ) : (
                <>
                    <label>Current File:</label>
                    <div className="file-preview">
                    {initialData?.fileName || "No file information available"}
                    </div>
                </>
                )}


            <div className="modal-buttons">
                <button type="submit">{mode === "edit" ? "Save Changes" : "Submit"}</button>
                <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AddDocModal;
