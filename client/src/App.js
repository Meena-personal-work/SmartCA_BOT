import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./Chat-Bot";
import AdminPanel from "./AdminPanel";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
