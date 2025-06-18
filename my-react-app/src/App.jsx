//import './App.css'
import HomePage from "./components/HomePage";
import LogIn from './components/LogIn'
import Appointment from './components/Appointment'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    
   
    // ...שאר הייבוא



    
    
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<LogIn />} />
            <Route path="/appointment" element={<Appointment />} />
            {/* שאר הנתיבים */}
          </Routes>
        </Router>
      );
    }
    
    export default App;
  


  
