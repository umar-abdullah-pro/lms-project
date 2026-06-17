import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Homepage';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* Putting the Navbar OUTSIDE the Routes means it shows up on every single page! */}
      <Navbar /> 
      
      <div className="min-h-screen pb-10 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;