// ChatInterface.js

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatInterface() {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
  
    const genAI = new GoogleGenerativeAI("AIzaSyCMenNFHgeac3eUnjq5XeqDPzJvyng8LWM");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      console.log('Input:', input);
  
      if (input.trim()) {
        const userMessage = { sender: 'user', text: input };
        setConversation([...conversation, userMessage]);
  
        try {
          const prompt = input;
          const result = await model.generateContent(prompt);
  
          console.log('Generated content:', result.response.text());
  
          const formattedText = formatText(result.response.text());
          const aiMessage = { sender: 'ai', text: formattedText };
  
          setConversation([...conversation, userMessage, aiMessage]);
  
          setInput('');
        } catch (error) {
          console.error('Error generating AI response:', error.message);
        }
      }
    }
  
    function escapeHTML(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  
    function formatText(text) {
      text = escapeHTML(text);
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      text = text.replace(/(\.|\!|\?|\:)\s/g, '$1<br/><br/>');
      text = text.replace(/\* /g, '• ');
      text = text.replace(/```([\s\S]*?)```/g, (match, p1) => `<pre><code>${p1.trim()}</code></pre>`);
      text = text.replace(/`(.*?)`/g, '<code>$1</code>');
      return text;
    }
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
      color: isDarkMode ? '#e0e0e0' : '#121212',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '20px',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <div style={{
        flexGrow: 1,
        maxHeight: '80vh',
        overflowY: 'auto',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease'
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
              backgroundColor: message.sender === 'user' ? '#61dafb' : isDarkMode ? '#2c2c2c' : '#e0e0e0',
              color: message.sender === 'user' ? 'white' : isDarkMode ? '#e0e0e0' : 'black',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        borderRadius: '25px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease'
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
            backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0',
            color: isDarkMode ? '#e0e0e0' : '#121212',
            transition: 'background-color 0.3s ease, color 0.3s ease'
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
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: isDarkMode ? '#444' : '#ddd',
          color: isDarkMode ? '#fff' : '#000',
          border: 'none',
          borderRadius: '25px',
          marginTop: '10px',
          cursor: 'pointer',
          alignSelf: 'center',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}


export default ChatInterface;