import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList/TaskList';

const HEADER_HEIGHT = 70;

// Add global style for body background
const GlobalStyle = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }
    
    html, body {
      background: #f8fafc !important;
      margin: 0;
      font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
      color: #213547;
    }
    
    #root {
      background: #f8fafc;
      min-height: 100vh;
    }
  `}</style>
);

const Header: React.FC = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: HEADER_HEIGHT,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 24px',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>
          📋
        </div>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontWeight: '600', 
          fontSize: '24px', 
          letterSpacing: '0.5px',
          fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}>
          Task Management System
        </Link>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header />
        <main
          style={{
            padding: '24px 16px 32px 16px',
            marginTop: HEADER_HEIGHT,
            minHeight: 'calc(100vh - ' + HEADER_HEIGHT + 'px)',
            background: '#f8fafc',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Routes>
            <Route path="/" element={<TaskList />} />
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default App;
