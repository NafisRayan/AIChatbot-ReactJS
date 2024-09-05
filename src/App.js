// src/App.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const genAI = new GoogleGenerativeAI("AIzaSyCMenNFHgeac3eUnjq5XeqDPzJvyng8LWM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setConversation([...conversation, userMessage]);

      const prompt = input;
      const result = await model.generateContent(prompt);
      const aiMessage = { sender: 'ai', text: result.response.text() };
      setConversation([...conversation, userMessage, aiMessage]);

      setInput(''); // Clear input after sending
    }
  }

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '20px',
    }}>
      <div style={{
        flexGrow: 1,
        maxHeight: '80vh',
        overflowY: 'auto',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        {conversation.map((message, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: message.sender === 'user' ? '#61dafb' : '#e0e0e0',
              color: message.sender === 'user' ? 'white' : 'black',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        backgroundColor: '#ffffff',
        borderRadius: '25px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            border: 'none',
            outline: 'none',
            borderRadius: '25px',
            padding: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#61dafb',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
