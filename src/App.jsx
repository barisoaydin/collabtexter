import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import esprima from "esprima";
import Editor from "react-simple-code-editor";
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from "./components/Events";
import { MyForm } from './components/MyForm';
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function CodeChecker() {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  const checkCode = () => {
    try {
      esprima.parseScript(code);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (newMessage && socket) {
      const message = { sender: userName, text: newMessage };
      socket.emit("message", message);
      setMessages((messages) => [...messages, message]);
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
      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />
      <MyForm />
      {/* <nav className="navbar">
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
            <div className="chat-box bg-blue" id="output">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === userName ? "user-message" : "other-message"
                  }
                >
                  <strong>{message.sender}: </strong>{message.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage}>
              <div className="message-input">
                <textarea
                  id="newMessage"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
              </div>
              <button className="bg-blue" id="submitBtn" type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 collabtexter created by boa</p>
      </footer> */}
    </div>
  );
}

export default CodeChecker;
