import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList/TaskList';

const HEADER_HEIGHT = 70;

// Add global style for body background
const GlobalStyle = () => (
  <style>{`
    body {
      background: #ffffff;
      margin: 0;
      font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
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
      background: '#ffffff',
      color: '#2d3e50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e0e0e0',
      zIndex: 100,
    }}>
      <Link to="/" style={{ 
        color: '#2d3e50', 
        textDecoration: 'none', 
        fontWeight: '600', 
        fontSize: '24px', 
        letterSpacing: '0.5px',
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
      }}>
        Task Management System
      </Link>
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
            background: '#ffffff',
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
