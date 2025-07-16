import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList/TaskList';


const HEADER_HEIGHT = 64;

// Add global style for body background
const GlobalStyle = () => (
  <style>{`
    body {
      background: #f7f8fa;
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
      background: '#2d3e50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      zIndex: 100,
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 26, letterSpacing: 1 }}>
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
            display: 'grid',
            gridTemplateColumns: '1fr',
            justifyItems: 'center',
            padding: '24px 8px 32px 8px',
            marginTop: HEADER_HEIGHT + 8,
            minHeight: '100vh',
            background: '#f7f8fa',
            width: '100vw',
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
