import { Home } from 'lucide-react';
import './App.css';

// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import HomePage from './pages/Home';
import Login from './pages/Login';
import BrowseEvents from './pages/BrowseEvents';
import EventDetailPage from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Dashboard/>
  );
}

export default App;
