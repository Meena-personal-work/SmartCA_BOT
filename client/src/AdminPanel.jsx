import React, { useState } from "react";
import axios from "axios";

import "./AdminPanel.css";

const FileUpload = ({ optionId, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) return alert("Please select a file");
    setLoading(true);
    
    try {
      // Check if an existing file is associated with this optionId
      await axios.delete(`http://localhost:3001/option/${optionId}`);
      
      // Upload new file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("optionId", optionId);
      formData.append("label", optionId === "opt2" ? "Internal Exam Timetable" : "Class Timetable");
      
      await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert("File uploaded successfully");
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>Save</button>
      <button onClick={onClose} disabled={loading}>Cancel</button>
    </div>
  );
};

const AdminPanel = () => {
  const [uploadOption, setUploadOption] = useState(null);

  return (
    <div className="container">
      <div className="card">Announcement</div>
      <div className="card" onClick={() => setUploadOption("opt2")}>
        Internal Exam Timetable
      </div>
      <div className="card" onClick={() => setUploadOption("opt3")}>
        Class Timetable
      </div>
      
      {uploadOption && (
        <FileUpload optionId={uploadOption} onClose={() => setUploadOption(null)} />
      )}
    </div>
  );
};

export default AdminPanel;
