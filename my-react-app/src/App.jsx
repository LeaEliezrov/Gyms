//import './App.css'
import LogIn from './components/LogIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import HomePage from "./components/HomePage";
   
    // ...שאר הייבוא



    
    
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<LogIn />} />
            {/* שאר הנתיבים */}
          </Routes>
        </Router>
      );
    }
    
    export default App;
  


  
