import './App.css';
import AppBar from './components/AppBar.js';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Setup from './pages/setup.js';
import Dashboard from './pages/dashboard.js';
import Profile from "./pages/profile.js";
import Home from "./pages/home.js";

function App() {
  return (
    <div className="App">
      
      <Router>
  
        <AppBar/>
    
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/setup' element={<Setup/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
 
  );
}

export default App;
