import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./Chat-Bot";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
