import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import 'react-slideshow-image/dist/styles.css';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute> <Dashboard /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


        </Routes>
      </AuthContextProvider>
    </div>
  );
}
export default App;