import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import esprima from "esprima";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function CodeChecker() {
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(true);

  useEffect(() => {
    if (showNamePrompt) {
      const name = prompt("Please enter your name:");
      if (name !== null && name !== "") {
        setUserName(name);
        setCollaborators([name]);
        setShowNamePrompt(false);
        alert(`Welcome, ${name}!`);
      }
    }
  }, [showNamePrompt]);

  const checkCode = () => {
    try {
      esprima.parseScript(code);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== "") {
      alert(`Welcome, ${userName}!`);
      setCollaborators([...collaborators, userName]);
      setUserName("");
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">collabtexter</div>
        <div className="navbar-site">advanced collaborators text</div>
      </nav>
      <div className="container">
        <div className="code-container">
          <Editor
            className="code-editor"
            value={code}
            placeholder="Type your code..."
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.js)}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
        </div>
        <div className="panel-container">
          <div className="collaborators-box">
            <h2>Collaborators</h2>
            <table>
              <thead></thead>
              <tbody>
                {collaborators.map((collaborator, index) => (
                  <tr key={index}>
                    <td>{collaborator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="chat-panel">
            <h3 className="center-text">Messages</h3>
            <div className="chat-box bg-blue">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === "user" ? "user-message" : "other-message"
                  }
                >
                  {userName}: {message.text}
                </div>
              ))}
            </div>

            <div className="message-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </div>
            <button className="bg-blue" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 collabtexter created by boa</p>
      </footer>
    </div>
  );
}

export default CodeChecker;
