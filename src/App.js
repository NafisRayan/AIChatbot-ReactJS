// src/App.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const genAI = new GoogleGenerativeAI("AIzaSyCMenNFHgeac3eUnjq5XeqDPzJvyng8LWM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleSubmit(e) {
    e.preventDefault();
    
    const prompt = input;
    const result = await model.generateContent(prompt);
    setResponse(result.response.text());
  }

  return (
    <div style={{ 
      backgroundColor: '#282c34', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white'
    }}>
      <header style={{ 
        marginBottom: '20px',
        fontSize: '2rem'
      }}>
        <h1 style={{ 
          color: '#61dafb',
          marginBottom: '20px'
        }}>AI Chatbot</h1>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '600px' 
        }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your question..."
            style={{ 
              flexGrow: 1, 
              padding: '10px', 
              border: 'none', 
              borderRadius: '5px 0 0 5px'
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#61dafb', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer'
            }}
          >
            Ask AI
          </button>
        </form>
        {response && <p style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#282c34', 
          borderRadius: '5px'
        }}>{response}</p>}
      </header>
    </div>
  );
}

export default App;