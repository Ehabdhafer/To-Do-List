import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/Authcontext";
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Signup from "./components/signup";
import SignIn from "./components/SignIn";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Sidebar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
