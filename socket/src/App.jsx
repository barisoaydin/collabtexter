import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  const ws = new WebSocket('ws://localhost:5173');

  useEffect(() => {
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  }, [ws]);

  const sendMessage = () => {
    const messageObj = {
      username: username,
      message: message,
    };
    ws.send(JSON.stringify(messageObj));
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Socket Messaging App</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Received Messages</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;