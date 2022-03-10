import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import 'react-slideshow-image/dist/styles.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';


function App() {
  return (
    <div className="App">
      {/*       <Navbar />
 */}      {/*       <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>LifeChanger</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>

    </div>
  );
}
export default App;