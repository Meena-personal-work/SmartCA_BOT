// import React, { useState } from "react";
// import axios from "axios";

// import "./AdminPanel.css";

// const FileUpload = ({ optionId, onClose }) => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) return alert("Please select a file");
//     setLoading(true);
    
//     try {
//       // Check if an existing file is associated with this optionId
//       await axios.delete(`${process.env.REACT_APP_SERVER_PREFIX}/option/${optionId}`);
      
//       // Upload new file
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("optionId", optionId);
//       formData.append("label", optionId === "opt2" ? "Internal Exam Timetable" : "Class Timetable");
      
//       await axios.post(`${process.env.REACT_APP_SERVER_PREFIX}/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       alert("File uploaded successfully");
//       onClose();
//     } catch (error) {
//       console.error("Upload failed", error);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal">
//       <h3>Upload File</h3>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>Save</button>
//       <button onClick={onClose} disabled={loading}>Cancel</button>
//     </div>
//   );
// };

// const AdminPanel = () => {
//   const [uploadOption, setUploadOption] = useState(null);

//   return (
//     <div className="container">
//       <div className="card">Announcement</div>
//       <div className="card" onClick={() => setUploadOption("opt2")}>
//         Internal Exam Timetable
//       </div>
//       <div className="card" onClick={() => setUploadOption("opt3")}>
//         Class Timetable
//       </div>
      
//       {uploadOption && (
//         <FileUpload optionId={uploadOption} onClose={() => setUploadOption(null)} />
//       )}
//     </div>
//   );
// };

// export default AdminPanel;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./AdminPanel.css";
// import { FaFileAlt } from "react-icons/fa"; // File icon


// const FileUpload = ({ optionId, onClose }) => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [existingFile, setExistingFile] = useState(null);
//   const [refetch, setRefetch] = useState(false);

//   useEffect(() => {
//     const fetchFile = async () => {
//       try {
        
//         const response = await axios.get(`${process.env.REACT_APP_SERVER_PREFIX}/files/${optionId}`);
//         setExistingFile(response.data);
//       } catch (error) {
//         setExistingFile(null);
//       }
//     };
//     fetchFile();
//   }, [optionId, refetch]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please select a file");

//     setLoading(true);
//     try {
//       // Delete existing file (if any)
//       await axios.delete(`${process.env.REACT_APP_SERVER_PREFIX}/option/${optionId}`);

//       // Upload new file
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("optionId", optionId);
//       formData.append("label", optionId === "opt2" ? "Internal Exam Timetable" : "Class Timetable");

//       const response = await axios.post(`${process.env.REACT_APP_SERVER_PREFIX}/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       console.log(response.data.message);
      
//       if(response.data.message = 'File uploaded successfully'){
      
//               toast.success("File uploaded successfully...", { autoClose: 2000 });
//               setRefetch(!refetch);
            
//             }else{
//               toast.error("Failed to upload....", { autoClose: 2000 });
      
//             }
//       // onClose();
//     } catch (error) {
//       toast.error("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleClose = () => {
//     setFile(null); // Clear file input before closing
//     onClose();
//   };
//   return (
//     <div className="modal">
//       <h3>Upload File</h3>
//       {existingFile && (
//         <div className="existing-file">
//           <FaFileAlt color="#0dae85" /> <a href={`${process.env.REACT_APP_SERVER_PREFIX}${existingFile.url}`} download={existingFile.url.split('/').pop()|| "downloadedFile"} target="_blank" rel="noopener noreferrer">{existingFile.url.split('/').pop()}</a>
//         </div>
//       )}
//       <input type="file" onChange={handleFileChange} />
//       <div className="btn-container">
//       <button className='loginbutton' onClick={handleUpload} disabled={loading}>{loading ? "Uploading..." : "Save"}</button>
//       <button className='loginbutton' onClick={handleClose}  disabled={loading}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// const AdminPanel = () => {
//   const [uploadOption, setUploadOption] = useState(null);

//   return (
//     <div className="container">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h3>Admin Panel</h3>
//       <div className="card">📢 Announcement</div>
//       <div className="card" onClick={() => setUploadOption("opt2")}>📅 Internal Exam Timetable</div>
//       <div className="card" onClick={() => setUploadOption("opt3")}>📚 Class Timetable</div>

//       {uploadOption && <FileUpload optionId={uploadOption} onClose={() => setUploadOption(null)} />}
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import { FaFileAlt, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FileUpload = ({ optionId, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingFile, setExistingFile] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PREFIX}/files/file/${optionId}`);
        setExistingFile(response.data);
      } catch (error) {
        setExistingFile(null);
      }
    };
    fetchFile();
  }, [optionId, refetch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");

    setLoading(true);
    try {
      // Delete existing file (if any)
      await axios.delete(`${process.env.REACT_APP_SERVER_PREFIX}/option/${optionId}`);

      // Upload new file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("optionId", optionId);
      formData.append("label", optionId === "opt2" ? "Internal Exam Timetable" : "Class Timetable");

      const response = await axios.post(`${process.env.REACT_APP_SERVER_PREFIX}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log(response.data.message);
      
      if(response.data.message = 'File uploaded successfully'){
      
              toast.success("File uploaded successfully...", { autoClose: 2000 });
              setRefetch(!refetch);
            
            }else{
              toast.error("Failed to upload....", { autoClose: 2000 });
      
            }
      // onClose();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setFile(null); // Clear file input before closing
    onClose();
  };
  return (
    <div className="modal">
      <h3>Upload File</h3>
      {existingFile && (
        <div className="existing-file">
          <FaFileAlt color="#0dae85" /> <a href={`${process.env.REACT_APP_SERVER_PREFIX}${existingFile.url}`} download={existingFile.url.split('/').pop()|| "downloadedFile"} target="_blank" rel="noopener noreferrer">{existingFile.url.split('/').pop()}</a>
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      <div className="btn-container">
      <button className='loginbutton' onClick={handleUpload} disabled={loading}>{loading ? "Uploading..." : "Save"}</button>
      <button className='loginbutton' onClick={handleClose}  disabled={loading}>Cancel</button>
      </div>
    </div>
  );
};

// const AnnouncementModal = ({ onClose }) => {
//   const [announcement, setAnnouncement] = useState("");
//   const [title, setTitle] = useState("");
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER_PREFIX}/announcements`);
//       console.log(response,'mmm');
      
//       setAnnouncements(response.data);
//     } catch (error) {
//       console.error("Failed to fetch announcements", error);
//     }
//   };

//   const handleAddAnnouncement = async () => {
//     if (!announcement) return toast.error("Enter an announcement");

//     setLoading(true);
//     try {
//       await axios.post(`${process.env.REACT_APP_SERVER_PREFIX}/add/announcements`, { title: title, content: announcement });
//       toast.success("Announcement added");
//       setAnnouncement("");
//       setTitle("");
//       fetchAnnouncements();
//     } catch (error) {
//       toast.error("Failed to add announcement");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_SERVER_PREFIX}/announcements/${id}`);
//       toast.success("Announcement deleted");
//       fetchAnnouncements();
//     } catch (error) {
//       toast.error("Failed to delete");
//     }
//   };

//   return (
//     <div className="modal">
//       <h3>📢 Announcements</h3>
//       <input
//         type="text"
//         placeholder="Enter announcement"
//         value={title}
//         onChange={(e) => setAnnouncement(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter announcement"
//         value={announcement}
//         onChange={(e) => setAnnouncement(e.target.value)}
//       />
//       <button onClick={handleAddAnnouncement} disabled={loading}>
//         {loading ? "Adding..." : "Add Announcement"}
//       </button>
//       <button onClick={onClose}>Close</button>

//       <div className="announcement-list">
//         {announcements.map((item) => (
//           <div className="announcement-tile" key={item.id}>
//             {item.content} <FaTrash onClick={() => handleDelete(item.id)} className="delete-icon" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const AnnouncementModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_PREFIX}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!title || !content) return toast.error("Enter title and announcement");

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_PREFIX}/add/announcements`, { title, content });
      toast.success("Announcement added");
      setTitle("");
      setContent("");
      setShowAddModal(false);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to add announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_PREFIX}/announcements/${id}`);
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h3>📢 Announcements</h3>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add
        </button>
      </div>
      <div className="announcement-container-grid">
      <div className="announcement-grid">
        {announcements.map((item) => (
          <div className="announcement-tile" key={item.id}>
            <h4 className="title-announcement">{item.title}</h4>
            <p className="content-announcement">{item.content}</p>
          </div>
        ))}
      </div>
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>

      {showAddModal && (
        <div className="overlay">
          <div className="modal add-modal">
            <h3 className="add-announ">Add Announcement</h3>
            <input type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Enter Announcement" value={content} onChange={(e) => setContent(e.target.value)} />
              <div className="add-announ-container-btn">
              <button className="add-announ-btn" onClick={handleAddAnnouncement} disabled={loading}>
              {loading ? "Adding..." : "Add Announcement"}
            </button>
            <button className="add-announ-btn"onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>

          </div>
        </div>
      )}
    </div>
  );
};

const AdminPanel = () => {
  const [uploadOption, setUploadOption] = useState(null);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <button onClick={() => navigate('/')} className="back-button">
      <FaArrowLeft /> Back To User ChatBot
    </button>
      <h3>Admin Panel</h3>
      <div className="card-flex-container">
      <div className="card" onClick={() => {
        setUploadOption(null);
        setShowAnnouncements(true);
      }}>📢 Announcement</div>
      <div className="card" onClick={() => {
        setShowAnnouncements(false);
        setUploadOption("opt2")
      }}>📅 Internal Exam Timetable</div>
      <div className="card" onClick={() => {
        setShowAnnouncements(false);
        setUploadOption("opt3")
      }}>📚 Class Timetable</div>
      </div>


      {showAnnouncements && <AnnouncementModal onClose={() => setShowAnnouncements(false)} />}
      {uploadOption && <FileUpload optionId={uploadOption} onClose={() => setUploadOption(null)} />}
    </div>
  );
};

export default AdminPanel;
