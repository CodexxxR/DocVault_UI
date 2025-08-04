// components/DocPreviewModal.tsx
import React from "react";

interface DocPreviewProps {
  file: File | null;
  onClose: () => void;
}

const DocPreviewModal: React.FC<DocPreviewProps> = ({ file, onClose }) => {
  if (!file) return null;

  const fileUrl = URL.createObjectURL(file);
  const fileType = file.type;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Document Preview</h3>
        {fileType.startsWith("image/") && (
          <img src={fileUrl} alt="Preview" style={{ maxHeight: "35vh", width: "100%"}} />
        )}
        {fileType === "application/pdf" && (
          <iframe src={fileUrl} style={{ width: "100%", height: "35vh" }} />
        )}
        {fileType.startsWith("text/") && (
          <iframe src={fileUrl} style={{ width: "100%", height: "35vh" }} />
        )}
        <p><strong>Name:</strong> {file.name}</p>
        <p><strong>Type:</strong> {fileType}</p>
        <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DocPreviewModal;
