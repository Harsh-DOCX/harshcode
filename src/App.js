import './style.css'
// import './Navbar.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Project from './components/Project';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <>
    <Router basename='harshcode'>
      <Navbar />
      <Routes>
      <Route path='/' element={< Home/>} />
      <Route path='/projects' element={< Project/>} />
      <Route path='/about-me' element={< About/>}/>
      <Route path='/contact-me' element={<Contact />}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
