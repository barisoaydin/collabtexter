import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
  
function MainPanel() {
  return (
    <div className="main-panel">
      <div className="messages">
        {/* Mesajların yer alacağı bölüm */}
      </div>
      <div className="message-input">
        {/* Mesaj giriş alanı */}
        <textarea placeholder="Type your message..."></textarea>
        <button>Send</button>
      </div>
    </div>
  );
}

export default MainPanel;

