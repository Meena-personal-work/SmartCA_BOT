import React from "react";
// import "./Button.css";

const Admin = ({ type, label, fileUrl }) => {
  const handleClick = () => {
    if (type === "download" && fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "filename.ext"); // Update with the correct filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(`${type} button clicked!`);
    }
  };

  return (
    <button className={`custom-button ${type}`} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Admin;
