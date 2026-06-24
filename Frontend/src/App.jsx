import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar is outside Routes so it appears on every page */}
        <Navbar />

        <div className="min-h-screen pb-10 bg-brand-beige">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            Route
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;