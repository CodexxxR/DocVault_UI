// src/components/FileUploader.tsx
import React, { useState } from "react";
import "../styles/fileUploader.css";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setUploading(true);
    setFileName(file.name);

    setTimeout(() => {
      onFileSelect(file);
      setUploading(false);
    }, 1000); // simulate upload delay
  };

  const handleRemove = () => {
    setFileName(null);
    onFileSelect(null);
  };

  return (
    <div
      className={`dropbox ${uploading ? "uploading" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) handleFile(droppedFile);
      }}
    >
      {uploading ? (
        <div className="loader"></div>
      ) : (
        <>
          <p>
            {fileName
              ? `Selected File: ${fileName}`
              : "Drag and drop a file here, or click to browse"}
              
          </p>
          {fileName && (
            <button className="remove-button" onClick={handleRemove}>
              Remove File
            </button>
          )}
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) handleFile(selected);
            }}
          />
        </>
      )}
    </div>
  );
};

export default FileUploader;
