import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Expenses from "./pages/Expenses";
import Settlements from "./pages/Settlements";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Group from "./pages/Group";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/group" element={<Group />} />
            <Route path="/settlements" element={<Settlements />} />
          </Routes>
        </main>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
