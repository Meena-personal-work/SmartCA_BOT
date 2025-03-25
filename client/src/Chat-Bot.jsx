// // // import React, { useState, useEffect, useRef } from "react";
// // // import axios from "axios";
// // // import "./chat.css";

// // // const ChatBot = () => {
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState("");
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showNotifications, setShowNotifications] = useState(false);
// // //   const chatBoxRef = useRef(null); // Reference to chat box container
// // //   const [showUpArrow, setShowUpArrow] = useState(false); // State to control the visibility of the up arrow

// // //   // Scroll to the bottom whenever a new message is added
// // //   useEffect(() => {
// // //     if (chatBoxRef.current) {
// // //       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
// // //     }
// // //   }, [messages]);

// // //   // Detect when the user scrolls and toggle up arrow visibility
// // //   const handleScroll = () => {
// // //     if (chatBoxRef.current.scrollTop > 100) {
// // //       setShowUpArrow(true);
// // //     } else {
// // //       setShowUpArrow(false);
// // //     }
// // //   };

// // //   const sendMessage = async () => {
// // //     if (!input.trim()) return;

// // //     try {
// // //       const userMessage = { type: "user", text: input };
// // //       setMessages((prev) => [...prev, userMessage]);

// // //       const response = await axios.get(`http://localhost:3001/category/${input}`);

// // //       if (response.data.category === "default") {
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { type: "bot", text: "I didn't understand that. Try saying 'Hi'." }
// // //         ]);
// // //       } else {
// // //         // Extract recent announcements (if any)
// // //         const recentAnnouncements = response.data.options.find(
// // //           (opt) => opt.label === "Recent Announcements"
// // //         );

// // //         if (recentAnnouncements) {
// // //           setNotifications([{ text: recentAnnouncements.content }]);
// // //         }

// // //         // Filter out "Recent Announcements" from chat messages
// // //         const filteredOptions = response.data.options.filter(
// // //           (opt) => opt.label !== "Recent Announcements"
// // //         );

// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { type: "bot", text: `${response.data.category}` },
// // //           ...filteredOptions.map((opt) => ({
// // //             type: "option",
// // //             text: opt.label,
// // //             id: opt.optionId
// // //           }))
// // //         ]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching category:", error);
// // //     }

// // //     setInput("");
// // //   };

// // //   const handleOptionClick = async (optionId, optionText) => {
// // //     try {
// // //       setMessages((prev) => [...prev, { type: "user", text: optionText }]);

// // //       const response = await axios.get(`http://localhost:3001/option/${optionId}`);
// // //       const { option, file } = response.data;

// // //       if (optionText === "Recent Announcements") {
// // //         setNotifications([{ text: content }]); // Store announcement inside the bell icon
// // //       }

// // //       if (option.type === "link" && option.url) {
// // //         window.open(option.url, "_blank"); // ✅ Open the link in a new tab
// // //         return;
// // //       } else if (option.type === "download" && option.url) {
// // //         setMessages((prev) => [...prev, { type: "download", text: "Click here to download", id:option.fieldId, url: option.url, fileName: option.fileName }]);
// // //       } else {
// // //         setMessages((prev) => [...prev, { type: "bot", text: option.content || "No additional details available." }]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching option details:", error);
// // //     }
// // //   };

// // //   // Scroll to the top
// // //   const scrollToTop = () => {
// // //     if (chatBoxRef.current) {
// // //       chatBoxRef.current.scrollTop = 0;
// // //     }
// // //   };

// // //   return (
// // //     <div className="chatdiv">
// // //       <div className="chat-container">
// // //         {/* Chat Header */}
// // //         <div className="chat-header">
// // //           <img src="/images/aero.png" alt="Logo" className="chat-logo" />
// // //           <h2>HappyAir Support</h2>

// // //           {/* Bell Icon for Notifications */}
// // //           <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
// // //             🔔 {/* Bell Icon */}
// // //             {notifications.length > 0 && <span className="badge">{notifications.length}</span>}

// // //             {showNotifications && (
// // //               <div className="notifications-dropdown active">
// // //                 <h4>Recent Announcements</h4>
// // //                 {notifications.length > 0 ? (
// // //                   notifications.map((announcement, index) => (
// // //                     <p key={index} className="notification-item">{announcement.text}</p>
// // //                   ))
// // //                 ) : (
// // //                   <p className="notification-item">No recent announcements</p>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Chat Messages */}
// // //         <div
// // //           className="chat-box"
// // //           ref={chatBoxRef}
// // //           onScroll={handleScroll} // Listen to scroll event
// // //         >
// // //           {messages.map((msg, index) => (
// // //             <div key={index} className={`message ${msg.type}`}>
// // //               {msg.type === "option" ? (
// // //                 <button onClick={() => handleOptionClick(msg.id, msg.text)} className="option-btn">
// // //                   {msg.text}
// // //                 </button>
// // //               ) : msg.type === "link" ? (
// // //                 <a href={msg.url} target="_blank" rel="noopener noreferrer" className="href-video-session">
// // //                  <span style={{ marginRight: "5px" }}>🔗</span> {msg.text}
// // //                 </a>
// // //               ) : msg.type === "download" ? (
// // //                 <a href={`http://localhost:3001${msg.url}`} download={msg.fileName || "downloadedFile"} className="download-btn">
// // //                   {msg.text}
// // //                 </a>
// // //               ) : (
// // //                 msg.text // Show normal text messages (bot/user)
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Scroll to Top Button */}
// // //         {showUpArrow && (
// // //           <button className="up-arrow-btn" onClick={scrollToTop}>
// // //             ↑
// // //           </button>
// // //         )}

// // //         {/* Chat Input Box */}
// // //         <div className="input-box">
// // //           <input
// // //             type="text"
// // //             placeholder="Type your message here..."
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// // //           />
// // //           <button onClick={sendMessage} className="send-btn">➤</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatBot;


// // import React, { useState, useEffect, useRef } from "react";
// // import axios from "axios";
// // import "./chat.css";

// // const ChatBot = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [notifications, setNotifications] = useState([]);
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const chatBoxRef = useRef(null);
// //   const [showUpArrow, setShowUpArrow] = useState(false);

// //   useEffect(() => {
// //     if (chatBoxRef.current) {
// //       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const handleScroll = () => {
// //     setShowUpArrow(chatBoxRef.current.scrollTop > 100);
// //   };

// //   const formatContent = (content) => {
// //     if (content.includes("1.")) {
// //       return content.split(/(?=\d\.)/).map((line, index) => (
// //         <div key={index}>{line.trim()}</div>
// //       ));
// //     }
// //     return content;
// //   };

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     try {
// //       setMessages((prev) => [...prev, { type: "user", text: input }]);
// //       const response = await axios.get(`http://localhost:3001/category/${input}`);

// //       if (response.data.category === "default") {
// //         setMessages((prev) => [
// //           ...prev,
// //           { type: "bot", text: "I didn't understand that. Try saying 'Hi'." }
// //         ]);
// //       } else {
// //         const filteredOptions = response.data.options.filter(
// //           (opt) => opt.label !== "Recent Announcements"
// //         );

// //         setMessages((prev) => [
// //           ...prev,
// //           { type: "bot", text: `${response.data.category}` },
// //           ...filteredOptions.map((opt) => ({
// //             type: "option",
// //             text: opt.label,
// //             id: opt.optionId
// //           }))
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching category:", error);
// //     }

// //     setInput("");
// //   };

// //   const handleOptionClick = async (optionId, optionText) => {
// //     try {
// //       setMessages((prev) => [...prev, { type: "user", text: optionText }]);
// //       const response = await axios.get(`http://localhost:3001/option/${optionId}`);
// //       const { content, type, url, fileName } = response.data;

// //       if (type === "link" && url) {
// //         window.open(url, "_blank");
// //         return;
// //       } else if (type === "download" && url) {
// //         setMessages((prev) => [...prev, { type: "download", text: "Click here to download", url, fileName }]);
// //       } else {
// //         setMessages((prev) => [...prev, { type: "bot", text: formatContent(content) }]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching option details:", error);
// //     }
// //   };

// //   const scrollToTop = () => {
// //     chatBoxRef.current.scrollTop = 0;
// //   };

// //   return (
// //     <div className="chatdiv">
// //       <div className="chat-container">
// //         <div className="chat-header">
// //           <img src="/images/aero.png" alt="Logo" className="chat-logo" />
// //           <h2>HappyAir Support</h2>
// //           <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
// //             🔔
// //             {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
// //             {showNotifications && (
// //               <div className="notifications-dropdown active">
// //                 <h4>Recent Announcements</h4>
// //                 {notifications.length > 0 ? (
// //                   notifications.map((announcement, index) => (
// //                     <p key={index} className="notification-item">{announcement.text}</p>
// //                   ))
// //                 ) : (
// //                   <p className="notification-item">No recent announcements</p>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //         <div className="chat-box" ref={chatBoxRef} onScroll={handleScroll}>
// //           {messages.map((msg, index) => (
// //             <div key={index} className={`message ${msg.type}`}>
// //               {msg.type === "option" ? (
// //                 <button onClick={() => handleOptionClick(msg.id, msg.text)} className="option-btn">
// //                   {msg.text}
// //                 </button>
// //               ) : msg.type === "link" ? (
// //                 <a href={msg.url} target="_blank" rel="noopener noreferrer" className="href-video-session">
// //                  <span style={{ marginRight: "5px" }}>🔗</span> {msg.text}
// //                 </a>
// //               ) : msg.type === "download" ? (
// //                 <a href={msg.url} download={msg.fileName || "downloadedFile"} className="download-btn">
// //                   {msg.text}
// //                 </a>
// //               ) : (
// //                 msg.text
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //         {showUpArrow && (
// //           <button className="up-arrow-btn" onClick={scrollToTop}>
// //             ↑
// //           </button>
// //         )}
// //         <div className="input-box">
// //           <input
// //             type="text"
// //             placeholder="Type your message here..."
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
// //           />
// //           <button onClick={sendMessage} className="send-btn">➤</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBot;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./chat.css";

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const chatBoxRef = useRef(null);
//   const [showUpArrow, setShowUpArrow] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleScroll = () => {
//     if (chatBoxRef.current.scrollTop > 100) {
//       setShowUpArrow(true);
//     } else {
//       setShowUpArrow(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     try {
//       const userMessage = { type: "user", text: input };
//       setMessages((prev) => [...prev, userMessage]);
//       setIsTyping(true);

//       const response = await axios.get(`http://localhost:3001/category/${input}`);
//       setIsTyping(false);

//       if (response.data.category === "default") {
//         setMessages((prev) => [
//           ...prev,
//           { type: "bot", text: "🤖 I didn't understand that. Try saying 'Hi'." }
//         ]);
//       } else {
//         const recentAnnouncements = response.data.options.find(
//           (opt) => opt.label === "Recent Announcements"
//         );

//         if (recentAnnouncements) {
//           setNotifications([{ text: recentAnnouncements.content }]);
//         }

//         const filteredOptions = response.data.options.filter(
//           (opt) => opt.label !== "Recent Announcements"
//         );

//         setMessages((prev) => [
//           ...prev,
//           { type: "bot", text: `📢 ${response.data.category}` },
//           ...filteredOptions.map((opt) => ({
//             type: "option",
//             text: opt.label,
//             id: opt.optionId
//           }))
//         ]);
//       }
//     } catch (error) {
//       console.error("Error fetching category:", error);
//       setIsTyping(false);
//     }

//     setInput("");
//   };

//   const formatContent = (content) => {
//     if (content.includes("1.")) {
//       console.log(content,'meena');
      
//       return (
//         <div>
//           <h3>Please follow Steps to Follow :</h3>
//           {content.split(/(?=\d\.)/).map((line, index) => (
//             <div key={index}>
//                {line.trim()}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return content;
//   };
  

//   const handleOptionClick = async (optionId, optionText) => {
//     try {
//       setMessages((prev) => [...prev, { type: "user", text: optionText }]);
//       setIsTyping(true);

//       const response = await axios.get(`http://localhost:3001/option/${optionId}`);
//       const { content, type, url, fileName } = response.data;
//       setIsTyping(false);

//       if (type === "link" && url) {
//         window.open(url, "_blank");
//         return;
//       } else if (type === "download" && url) {
//         setMessages((prev) => [...prev, { type: "download", text: "📥 Click here to download", url, fileName }]);
//       } else {
//          setMessages((prev) => [...prev, { type: "bot", text: formatContent(content) || "No additional details available." }]);
//       }
//     } catch (error) {
//       console.error("Error fetching option details:", error);
//     }
//   };

//   const scrollToTop = () => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = 0;
//     }
//   };

//   return (
//     <div className="chatdiv">
//       <div className="chat-container">
//         <div className="chat-header">
//           <img src="/images/aero.png" alt="Logo" className="chat-logo" />
//           <h2>🎙️ SFR TALK</h2>

//           <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
//             🔔
//             {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
//             {showNotifications && (
//               <div className="notifications-dropdown active">
//                 <h4>📢 Recent Announcements</h4>
//                 {notifications.length > 0 ? (
//                   notifications.map((announcement, index) => (
//                     <p key={index} className="notification-item">{announcement.text}</p>
//                   ))
//                 ) : (
//                   <p className="notification-item">No recent announcements</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="chat-box" ref={chatBoxRef} onScroll={handleScroll}>
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.type}`}>
//               {msg.type === "option" ? (
//                 <button onClick={() => handleOptionClick(msg.id, msg.text)} className="option-btn">
//                   🔘 {msg.text}
//                 </button>
//               ) : msg.type === "link" ? (
//                 <a href={msg.url} target="_blank" rel="noopener noreferrer" className="href-video-session">
//                   🎬 {msg.text}
//                 </a>
//               ) : msg.type === "download" ? (
//                 <a href={msg.url} download={msg.fileName || "downloadedFile"} className="download-btn">
//                   📥 {msg.text}
//                 </a>
//               ) : (
//                 <span>{msg.text}</span>
//               )}
//             </div>
//           ))}
//           {isTyping && <div className="typing-indicator">⏳ Typing...</div>}
//         </div>

//         {showUpArrow && (
//           <button className="up-arrow-btn" onClick={scrollToTop}>↑</button>
//         )}

//         <div className="input-box">
//           <input type="text" placeholder="💬 Type your message here..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
//           <button onClick={sendMessage} className="send-btn">➤</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css"; // Import your CSS file
import { motion } from "framer-motion";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const chatBoxRef = useRef(null);
  const [showUpArrow, setShowUpArrow] = useState(false);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (chatBoxRef.current.scrollTop > 100) {
      setShowUpArrow(true);
    } else {
      setShowUpArrow(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    try {
      const userMessage = { type: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
  
      // Check if the user sent "Hi"
      if (input.trim().toLowerCase() === "hi") {
        // Special handling for "Hi" message
        const response = await axios.get(`http://localhost:3001/category/${input}`);
  
        // Add the message with the special class and image
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            specialClass: "with-image", // Add special class for styling
          },
          {
            type: "bot",
            text: `Hello! Welcome to SmartCA Bot. ${response.data.text || "How can I assist you?"}`,
          },
          ...response.data.options.map((option) => ({
            type: "option",
            text: option.label,
            id: option.optionId,
          })),
        ]);
      } else {
        // Regular handling for other messages
        const response = await axios.get(`http://localhost:3001/category/${input}`);
  
        if (response.data.category === "default") {
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: "I didn't understand that. Try saying 'Hi'." },
          ]);
        } else {
          // Extract recent announcements (if any)
          const recentAnnouncements = response.data.options.find(
            (opt) => opt.label === "Recent Announcements"
          );
  
          if (recentAnnouncements) {
            setNotifications([{ text: recentAnnouncements.content }]);
          }
  
          // Filter out "Recent Announcements" from chat messages
          const filteredOptions = response.data.options.filter(
            (opt) => opt.label !== "Recent Announcements"
          );
  
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: `${response.data.category}` },
            ...filteredOptions.map((opt) => ({
              type: "option",
              text: opt.label,
              id: opt.optionId,
            })),
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  
    setInput(""); // Clear the input field after sending the message
  };
  

    const formatContent = (content) => {
    if (content.includes("1.")) {
      
      return (
        <div>
          <h3>Please check the details below :</h3>
          {content.split(/(?=\d\.)/).map((line, index) => (
            <div key={index}>
               {line.trim()}
            </div>
          ))}
        </div>
      );
    }
    return content;
  };

  const handleOptionClick = async (optionId, optionText) => {
    try {
      setMessages((prev) => [...prev, { type: "user", text: optionText }]);

      const response = await axios.get(`http://localhost:3001/option/${optionId}`);
      const { option, file } = response.data;

      if (optionText === "Recent Announcements") {
        setNotifications([{ text: option.content }]); // Store announcement inside the bell icon
      }

      if (option.type === "link" && option.url) {
        window.open(option.url, "_blank"); // ✅ Open the link in a new tab
        return;
      } else if (option.type === "download" && option.url) {
        // ----> Modified ---->
        setMessages((prev) => [...prev, { type: "download", text: "Click here to download", id:option.fieldId, url: option.url, fileName: option.fileName }]);
      } else {
        setMessages((prev) => [...prev, { type: "bot", text: option.content || "No additional details available." }]);
      }
    } catch (error) {
      console.error("Error fetching option details:", error);
    }
  };

  const scrollToTop = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="chatdiv">
      <div className="chat-container">
        <div className="chat-header">
          <img src="/images/aero.png" alt="Logo" className="chat-logo" />
          <h2>🎙️ SmartCA Bot</h2>

          <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
            🔔
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
            {showNotifications && (
              <div className="notifications-dropdown active">
                <h4>📢 Recent Announcements</h4>
                {notifications.length > 0 ? (
                  notifications.map((announcement, index) => (
                    <p key={index} className="notification-item">{announcement.text}</p>
                  ))
                ) : (
                  <p className="notification-item">No recent announcements</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef} onScroll={handleScroll}>
          {messages.map((msg, index) => (
            <motion.div key={index} className={`message ${msg.type} ${msg.specialClass || ""}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {msg.type === "option" ? (
                <button onClick={() => handleOptionClick(msg.id, msg.text)} className="option-btn">
                  ▶  {msg.text}
                </button>
              ) : msg.type === "link" ? (
                <a href={msg.url} target="_blank" rel="noopener noreferrer" className="href-video-session">
                  <span style={{ marginRight: "5px" }}>🔗</span> 🎬 {msg.text}
                </a>
              ) : msg.type === "download" ? (
                <a href={`http://localhost:3001${msg.url}`} download={msg.fileName || "downloadedFile"} className="download-btn">
                  📥 {msg.text}
                </a>
              ) : (
                msg.text // Show normal text messages (bot/user)
              )}
            </motion.div>
          ))}
        </div>

        {showUpArrow && (
          <button className="up-arrow-btn" onClick={scrollToTop}>
            ↑
          </button>
        )}

        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="send-btn">➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
